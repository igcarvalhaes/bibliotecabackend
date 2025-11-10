import { prisma } from "../lib/prisma";

export const livrosService = {
  // criar livro
  async criar(data: {
    nome: string;
    autor: string;
    preco: number;
    quantidade: number;
  }) {
    return await prisma.livros.create({ data });
  },

  // listando todos os livros
  async listar() {
    return await prisma.livros.findMany();
  },

  //   buscando livro por id
  async buscarPorId(id: string) {
    return await prisma.livros.findUnique({
      where: { id },
    });
  },

  //   atualizar livro
  async atualizar(
    id: string,
    data: {
      nome: string;
      autor: string;
      preco: number;
      quantidade: number;
    }
  ) {
    return await prisma.livros.update({
      //atualiza o livro quando o id bater com o que to procurando
      where: { id },
      data,
    });
  },

  //   remover livro
  async remover(id: string) {
    return await prisma.livros.delete({
      where: { id },
    });
  },
};
