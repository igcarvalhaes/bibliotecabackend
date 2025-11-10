import type { FastifyInstance } from "fastify";
import { livrosController } from "../controllers/livros.controller";

export async function livrosRoutes(app: FastifyInstance) {
  // post /livros - criar livro
  app.post("/livros", livrosController.criarLivros);

  // /livros - listar livros
  app.get("/livros", livrosController.listarLivros);

  // /livros - atualizar livros
  app.put("/livros/:id", livrosController.atualizarLivros);

  // /livros - remover livros
  app.delete("/livros/:id", livrosController.removerLivro);
}
