import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SECRET_JWT: z.string().min(8, "Secret JWT deve ter no mínimo 8 caracteres"),
  PORT: z.coerce.number().default(3000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Variáveis de ambient innnválidas:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
