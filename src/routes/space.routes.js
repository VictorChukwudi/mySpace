// const fastify = require("../../app.server");
require("dotenv").config()
const { createSpace,getSpace, deleteSpace, getMySpaces } = require("../controllers/space.controller");
const jwt=require("jsonwebtoken")
const fastifyAuth=require("@fastify/auth")

const spaceRoutes=(fastify,options, done)=>{
    
    fastify
        .register(fastifyAuth)
        .after(()=>{
        fastify.post("/create",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},createSpace)
        fastify.get("/all",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},getMySpaces)
        fastify.get("/:space_id",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},getSpace)
        fastify.delete("/:space_id",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},deleteSpace)
        })

done()
}




module.exports=spaceRoutes