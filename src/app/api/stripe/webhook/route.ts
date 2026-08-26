import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";


const isPremiumActive=(status:Stripe.Subscription.Status)=>{
return status==="active" || status === "trialing"
}


const syncSubscription=async(subscription: Stripe.Subscription)=>{
    const currentPeriodEndUnix=subscription.items.data[0].current_period_end;
    const customerId=
    typeof subscription.customer==="string"
    ? subscription.customer
    : subscription.customer?.id;
    const metadataCustomerId=subscription.metadata?.userId;

    const whereCondition=metadataCustomerId
    ?{OR:[{stripeCustomerId:customerId},{id:metadataCustomerId}]}
    :{stripeCustomerId:customerId};

    const user=await prisma.user.findFirst({
        where:whereCondition,
        select:{id:true}
    });

    if(!user) return;

    const item=subscription.items.data[0];
    const unitAmount=item?.price?.unit_amount;
    const amount=typeof unitAmount==="number"?unitAmount/100 : null;
    const currency=item?.price?.currency ? item.price.currency.toUpperCase(): null;

    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            stripeCustomerId:customerId,
            stripeSubscriptionId:subscription.id,
            isPremium:isPremiumActive(subscription.status),
            premiumExpiresAt:
            typeof currentPeriodEndUnix==="number"
            ?new Date(currentPeriodEndUnix*1000)
            :null,
            premiumAmount:amount,
            premiumCurrency:currency,
            premiumLastPaymentAt:new Date()
        }
    })
}


export async function POST(req:Request){
const signature=req.headers.get("stripe-signature");
const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET

if(!signature || !webhookSecret){
    return new Response("Missing stripe webhook config",{status:400})
};
const payLoad=await req.text();
let event:Stripe.Event;

try{
    event=stripe.webhooks.constructEvent(
        payLoad,
        signature,
        webhookSecret
    )
}catch(err){
    console.log(err);
    return new Response("Invalid signature",{status:400})
};

// -------------------------------------------

try {
    if(event.type==="customer.subscription.created"||event.type==="customer.subscription.updated" || event.type==="customer.subscription.deleted" || event.type==="invoice.payment_succeeded"){
        const subscription=event.data.object as Stripe.Subscription;
        await syncSubscription(subscription)
    };
    return new Response("OK",{status:200})
}catch(err){
    console.log(err);
    return new Response("Invalid",{status:400})
}
}