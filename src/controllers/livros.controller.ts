import type { FastifyRequest, FastifyReply } from "fastify";
import { livrosService } from "../services/livros.service";

export const livrosController = {
  // Post /livros - Criar Livro
  async criarLivros(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, autor, preco, quantidade } = request.body as any;

      const livro = await livrosService.criar({
        nome,
        autor,
        preco,
        quantidade,
      });

      return reply.status(201).send(livro);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao criar livro" });
    }
  },

  // get - listar livros
  async listarLivros(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const livros = await livrosService.listar();
      return reply.send(livros);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao listar livros" });
    }
  },

  async atualizarLivros(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const { nome, autor, preco, quantidade } = request.body as any;

      const livro = livrosService.atualizar(id, {
        nome,
        autor,
        preco,
        quantidade,
      });

      return reply.status(200).send(livro);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao atualizar livro" });
    }
  },

  async removerLivro(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;

      livrosService.remover(id);
      return reply.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      return reply.status(404).send({ error: "Livro não encontrado" });
    }
  },
};
