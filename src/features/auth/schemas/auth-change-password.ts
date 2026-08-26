

import * as z from "zod";

export const authChangePasswordSchema = z.object({
  newPassword:z.string().min(10),
  token:z.string()
});