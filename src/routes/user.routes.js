const { register } = require("../controllers/user.controller");

const userRoutes = (fastify, options, done) => {
  fastify.post("/register", register);
  done();
};

module.exports = userRoutes;
