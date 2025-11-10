import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../utils/hash";

export const usuariosService = {
  // criar usuario

  async criar(data: { nome: string; email: string; password: string }) {
    const hashedPassword = await hashPassword(data.password);

    return await prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
  },

  // buscar poe email
  async buscarPorEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  //   buscar por id
  async buscarPorId(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
  },

  //   validar credenciais
  async validarCredenciais(email: string, password: string) {
    const user = await this.buscarPorEmail(email);

    if (!user) {
      return null;
    }

    const senhaValida = await verifyPassword(password, user.password);

    if (!senhaValida) {
      return null;
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  },
};
