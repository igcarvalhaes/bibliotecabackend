import type { FastifyInstance } from "fastify";
import { livrosController } from "../controllers/livros.controller";
import {
  criarLivroSchema,
  IdParamsSchema,
  livroResponseSchema,
  removerResponseSchema,
} from "../schemas/livro";
import z from "zod";

export async function livrosRoutes(app: FastifyInstance) {
  // post /livros - criar livro
  app.post(
    "/livros",
    {
      schema: {
        tags: ["Livros"],
        summary: "Criar novo livro",
        description: "Adiciona um novo livro ao catálogo",
        body: criarLivroSchema,
        response: {
          201: livroResponseSchema,
        },
      },
    },
    livrosController.criarLivros
  );

  // /livros - listar livros
  app.get(
    "/livros",
    {
      schema: {
        tags: ["Livros"],
        summary: "Listar todos os livros",
        description: "Retorna lista completa de livros cadastrados",
        response: {
          200: z.array(livroResponseSchema),
        },
      },
    },
    livrosController.listarLivros
  );

  // /livros - atualizar livros
  app.put(
    "/livros/:id",
    {
      schema: {
        tags: ["Livros"],
        summary: "Atualizar livro",
        description: "Atualiza informações de um livro existente",
        params: IdParamsSchema,
        body: criarLivroSchema,
        response: {
          200: livroResponseSchema,
        },
      },
    },
    livrosController.atualizarLivros
  );

  // /livros - remover livros
  app.delete(
    "/livros/:id",
    {
      schema: {
        tags: ["Livros"],
        summary: "Remover livro",
        description: "Remove um livro do catálogo",
        params: IdParamsSchema,
        response: {
          200: removerResponseSchema,
        },
      },
    },
    livrosController.removerLivro
  );
}
