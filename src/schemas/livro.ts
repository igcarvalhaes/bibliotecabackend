import z from "zod";

// schema de criaçao de livros
export const criarLivroSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  preco: z.number().positive("Preço deve ser positivo"),
  quantidade: z.number().positive("Quantidade deve ser positiva"),
});

// Schema de resposta (output)
export const livroResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  autor: z.string(),
  preco: z.number(),
  quantidade: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Schema para array de livros
export const livrosArraySchema = z.array(livroResponseSchema);

// schema de deletar livros
export const removerResponseSchema = z.object({
  message: z.string(),
});

// schema de params
export const IdParamsSchema = z.object({
  id: z.string(),
});

// Types inferidos automaticamente
export type CriarLivroInput = z.infer<typeof criarLivroSchema>;

export type LivroResponsne = z.infer<typeof livroResponseSchema>;

export type IdParams = z.infer<typeof IdParamsSchema>;
