const fastify = require("fastify")({ logger: true });
const port = 8000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

require("./src/app.config/db");

const start = async () => {
  try {
    await fastify.listen({ port, host });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
