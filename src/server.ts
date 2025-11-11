import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { env } from "./utils/env";
import { usuariosRoutes } from "./routes/usuarios.routes";
import { livrosRoutes } from "./routes/livros.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// configurar compiladores do zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Registrar Swagger (documentaçào OpenAI)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API de Livros e Usuários",
      description:
        "API REST completa com autenticação JWT, CRUD de livros e gestão de usuários. Desenvolvida com Fastify, TypeScript, Prisma e Zod.",
      version: "1.0.0",
      contact: {
        name: "Igor",
        email: "seuemail@exemplo.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Autenticação JWT.. Use o token obtido no endpoint /login",
        },
      },
    },
    tags: [
      { name: "Usuários", description: "Endpoints relacionados a usuários" },
      { name: "Livros", description: "Endpoints de gerenciamento de livros" },
    ],
  },
  transform: jsonSchemaTransform,
});

// Registrar Swagger UI (interface visual)
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

// registrar JWT
app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
});

// Decorator para autenticaçao
app.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({
      error: "Você precisa estar logado",
    });
  }
});

// registrar rotas
app.register(usuariosRoutes);
app.register(livrosRoutes);

app.get("/", () => {
  return { message: "API Rodando" };
});

app
  .listen({ port: 3000, host: "0.0.0.0" })
  .then((address) => console.log(`Servidor rodando em ${address}`))
  .then(() => {
    console.log(
      `Documentação Swagger disponível em http://127.0.0.1:3000/docs`
    );
  });
