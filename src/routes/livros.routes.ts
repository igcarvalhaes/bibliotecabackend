import type { FastifyInstance } from "fastify";
import { livrosController } from "../controllers/livros.controller";
import {
  criarLivroSchema,
  IdParamsSchema,
  livroResponseSchema,
} from "../schemas/livro";
import z from "zod";

export async function livrosRoutes(app: FastifyInstance) {
  // post /livros - criar livro
  app.post(
    "/livros",
    {
      schema: {
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
        params: IdParamsSchema,
      },
    },
    livrosController.removerLivro
  );
}
