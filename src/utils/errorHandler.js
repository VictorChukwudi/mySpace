const errorHandler = (error) => {
  reply.send({
    status: "error",
    message: error.message,
  });
};

module.exports = errorHandler;
