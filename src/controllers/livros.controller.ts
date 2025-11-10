import type { FastifyRequest, FastifyReply } from "fastify";
import { livrosService } from "../services/livros.service";
import z from "zod";
import type { CriarLivroInput, IdParams } from "../schemas/livro";

export const livrosController = {
  // Post /livros - Criar Livro
  async criarLivros(
    request: FastifyRequest<{ Body: CriarLivroInput }>,
    reply: FastifyReply
  ) {
    try {
      const { nome, autor, preco, quantidade } = request.body;

      const livro = await livrosService.criar({
        nome,
        autor,
        preco,
        quantidade,
      });

      return reply.status(201).send({
        ...livro,
        createdAt: livro.createdAt.toISOString(),
        updatedAt: livro.updatedAt.toISOString(),
      });
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao criar livro" });
    }
  },

  // get - listar livros
  async listarLivros(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const livros = await livrosService.listar();
      const livrosFormatados = livros.map((livro) => ({
        ...livro,
        createdAt: livro.createdAt.toISOString(),
        updatedAt: livro.updatedAt.toISOString(),
      }));
      return reply.status(200).send(livrosFormatados);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao listar livros" });
    }
  },

  async atualizarLivros(
    request: FastifyRequest<{ Body: CriarLivroInput; Params: IdParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const { nome, autor, preco, quantidade } = request.body;

      const livro = await livrosService.atualizar(id, {
        nome,
        autor,
        preco,
        quantidade,
      });

      return reply.status(200).send({
        ...livro,
        createdAt: livro.createdAt.toISOString(),
        updatedAt: livro.updatedAt.toISOString(),
      });
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao atualizar livro" });
    }
  },

  async removerLivro(
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      await livrosService.remover(id);
      return reply.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      return reply.status(404).send({ error: "Livro não encontrado" });
    }
  },
};
