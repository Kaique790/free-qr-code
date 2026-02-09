import { z } from "zod";

const serverEnvSchema = z.object({
  AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
