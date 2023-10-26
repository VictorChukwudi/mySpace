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

const getSpace=async(req,reply)=>{
    try {
        // console.log(req.user);
        const {space_id}=req.params
        if(!space_id){
            reply.code(400)
            throw new Error('Space id: space_id is required.')
        }else{
            const space= await Space.findOne({
                where:{space_id}
            })
            if(!space){
                reply.code(400)
                throw new Error(`Space with id: ${space_id} does not exist.`)
            }else{
                reply.code(200).send({
                    status:"success",
                    message:`Space with id: ${space_id} found.`,
                    data: space
                })
            }
        }
    } catch (error) {
        reply.code(200).send({
            status:"error",
            message:error.message
        })
    }
}

const getMySpaces=async(req,reply)=>{
    try {
        const spaces=await Space.findAll({where:{creator_id:req.user.id}})
        reply.code(200).send({
            status:'success',
            message:"Your spaces retrieved.",
            data:spaces.length < 1 ? "No spaces found.":spaces
        })
    } catch (error) {
        reply.code(500).send({
            status:"error",
            message:error.message
        })
        
    }
}
const deleteSpace=async(req,reply)=>{
    try {
        const {space_id}=req.params
        if(!space_id){
            reply.code(400)
            throw new Error('Space id: space_id is required.')
        }else{
            const space= await Space.findOne({
                where:{space_id}
            })
            if(!space){
                reply.code(400)
                throw new Error(`Space with id: ${space_id} does not exist.`)
            }else{
                if(req.user.id!==space.creator_id){
                    reply.code(403)
                    throw new Error(`Cannot delete space with id: ${space_id}.`)
                }else{
                    await Space.destroy({where:{space_id}})
                reply.code(200).send({
                    status:"success",
                    message:`Space with id: ${space_id} deleted successfully.`
                })
                }
            }
        }
    } catch (error) {
        reply.send({
            status:"error",
            message:error.message
        })
    }
}
module.exports={
    createSpace,
    getSpace,
    getMySpaces,
    deleteSpace,
}