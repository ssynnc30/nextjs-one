

import * as z from "zod";

export const authResetPasswordSchema = z.object({
  email:z.email(),
});