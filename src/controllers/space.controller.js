const Space=require('../models/space.model')
const createSpace=async(req,reply)=>{
    try {
        const {spaceName}=req.body
        reply.send({
            message:"accessed"
        })
    } catch (error) {
        
    }
}

module.exports={
    createSpace
}