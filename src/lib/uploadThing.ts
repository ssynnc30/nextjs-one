import {generateReactHelpers} from "@uploadthing/react";
import type {UploadRouter, uploadRouter} from "@/app/api/uploadthing/core";


export const {useUploadThing,uploadFiles}=generateReactHelpers<UploadRouter>()