// const fastify = require("../../app.server");
const { createSpace } = require("../controllers/space.controller");
const verifyJWTtoken = require("../utils/authenticate");

const spaceRoutes=(fastify,options, done)=>{
    

    fastify.register(require("fastify-plugin"))
        .after(()=>{privateSpaceRoutes(fastify)})
done()
}


const privateSpaceRoutes=(fastify,options, next)=>{
    fastify.post("/create",{preHandler:fastify.auth([verifyJWTtoken])},createSpace)
next()
}

module.exports=spaceRoutes