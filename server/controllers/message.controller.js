const prisma  = require("../lib/prisma");


exports.addMessage = async(req,res)=>{
    console.log("adding now")
    try{
        const tokenUserId = req.userId;
        const chatId = req.params.chatId;
        const text = req.body.text;

        const chat = await prisma.chat.findUnique({

            where:{
                id:chatId,
                userIDs:{
                    hasSome:[tokenUserId],
                }
            },

        }); 
        
        if(!chat)
        {
            return res.status(404).json({
                message:"Chat not found!"
            })
        }

        


        const message = await prisma.message.create({

            data:{
                text,
                chatId,
                userId:tokenUserId
            }
        })

        await prisma.chat.update({
            where:{
                id:chatId,
            },
            data:{
                seenBy:[tokenUserId],
                lastMessage:text
            }
        })

        return res.status(200).json(message)

        


    }catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Failed to add message!"})
    }
    
}