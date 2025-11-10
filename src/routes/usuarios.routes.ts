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
        response: {
          200: userPublicSchema,
        },
      },
    },
    usuariosController.profile
  );
}
