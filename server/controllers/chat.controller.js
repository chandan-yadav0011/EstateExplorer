import prisma from "../lib/prisma";

exports.getChats = async(req,res)=>{

    const tokenUserId = req.userId;

    try{

        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        });
 
        res.status(200).json(users);

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:"Failed to get Chats"
        })
    }
}

exports.getChat= async(req,res)=>{

}
