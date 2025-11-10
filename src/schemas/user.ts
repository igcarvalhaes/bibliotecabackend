import z from "zod";

// Schema para criar usuário
export const criarUsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha tem que ter ao menos 8 caracteres"),
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Schema da resposta publica do usuario (sem senha)
export const userPublicSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
});

// Schema de resposta de login
export const loginResponseSchema = z.object({
  user: userPublicSchema,
  token: z.string(),
});

// Types inferidos
export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserPublic = z.infer<typeof userPublicSchema>;
