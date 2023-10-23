const { register, login } = require("../controllers/user.controller");

const userRoutes = (fastify, options, done) => {
  fastify.post("/register", register);
  fastify.post("/login",login)
  done();
};

module.exports = userRoutes;
