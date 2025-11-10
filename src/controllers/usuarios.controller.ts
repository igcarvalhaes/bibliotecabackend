import type { FastifyRequest, FastifyReply } from "fastify";
import { usuariosService } from "../services/usuarios.service";
import z from "zod";
import { CriarUsuarioInput, LoginInput } from "../schemas/user";

export const usuariosController = {
  // post /user criar usuario

  async criar(
    request: FastifyRequest<{ Body: CriarUsuarioInput }>,
    reply: FastifyReply
  ) {
    try {
      const { nome, email, password } = request.body;

      // verificar se o usuario ja existe
      const existeUser = await usuariosService.buscarPorEmail(email);

      if (existeUser) {
        return reply.status(400).send({ message: "Usuário já existe" });
      }

      const user = await usuariosService.criar({
        nome,
        email,
        password,
      });

      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao criar usuário" });
    }
  },

  // post /login - login
  async login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = request.body;

      const user = await usuariosService.validarCredenciais(email, password);

      if (!user) {
        return reply.status(401).send({ error: "Credenciais inválidas" });
      }

      // gerar token jwt
      const token = request.server.jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: "7d",
        }
      );
      return reply.send({ user, token });
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao fazer o login" });
    }
  },

  //   get /profile - ver perfil (protegida)
  async profile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user.id;

      const user = await usuariosService.buscarPorId(userId);

      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado" });
      }

      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao buscar por perfil" });
    }
  },
};
