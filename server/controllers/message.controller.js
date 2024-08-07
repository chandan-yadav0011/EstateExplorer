import prisma from "../lib/prisma";


exports.addMessage = async(req,res)=>{

    const tokenUserId = req.userId;

    const messages = await prisma.message.findMany({
        where:{
            userId:{
            
            }
        }
    })
}