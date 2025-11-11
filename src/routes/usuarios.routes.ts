import type { FastifyInstance } from "fastify";
import { usuariosController } from "../controllers/usuarios.controller";
import {
  criarUsuarioSchema,
  userPublicSchema,
  loginSchema,
} from "../schemas/user";

export async function usuariosRoutes(app: FastifyInstance) {
  // post /user - criar usuario
  app.post(
    "/user",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Criar novo usuário",
        description:
          "Registra um novo usuário no sistema com nome, email e senha",
        body: criarUsuarioSchema,
        response: {
          201: userPublicSchema,
        },
      },
    },
    usuariosController.criar
  );

  // post /login - login
  app.post(
    "/login",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Autenticar usuário",
        description: "Realiza login e retorna token JWT para autenticação",
        body: loginSchema,
      },
    },
    usuariosController.login
  );

  // get /profile  - ver perfil (protegida)
  app.get(
    "/profile",
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ["Usuários"],
        summary: "Ver o perfil do usuário",
        description: "Retorna dados do usuário autenticado (requer token JWT)",
        security: [{ bearerAuth: [] }],
        response: {
          200: userPublicSchema,
        },
      },
    },
    usuariosController.profile
  );
}
