const Space=require('../models/space.model')
const shortUniqueId=require('short-unique-id')
const {randomUUID}=new shortUniqueId({length:10})

const createSpace=async(req,reply)=>{
    try {
        const {spaceName}=req.body
        const creator_id=req.user.id
        const space_id=randomUUID()
        const url="some url"
        const [space,created]= await Space.findOrCreate({
            where:{spaceName},
            defaults:{creator_id,space_id,spaceName,url}
        })
        if(!created){
            reply.code(400)
            throw new Error(`Space name: ${spaceName} already exists.`)
        }else{
            reply.code(201).send({
                status:"success",
                message:"Space created successfully.",
                data:{
                    creator_id,
                    space_id,
                    spaceName,
                    url
                }
            })
        }
    } catch (error) {
        reply.send({
            status:"error",
            message:error.message
        })
    }
}

module.exports={
    createSpace
}