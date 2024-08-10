const { hash } = require("bcrypt");
const prisma  = require("../lib/prisma");

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
 
        res.status(200).json(chats);

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

    const tokenUserId = req.userId;
    console.log("hii");

    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{        //this needs to be included if not then anyone can fetch the chat if they have chat id.
                    hasSome:[tokenUserId],   // this basically means that the person currently loggedIn  in the system is tokenUserId and this person is trying to access this particular chatId. So, before giving access to this person(loggedIn guy), Check whether he has right to access by searching the person's userId in the userIDS section of the chat created, which gives permission to only two users , this was done when we added chat. 
                },
            },
                // when the loggedIn person opens a chat we need to fetch all the chats and update the seen by array.
            include:{
                messages:{ 
                    orderBy:{
                        createdAt:"asc",  // this gives the latest chat first.
                    },

                },
            },

            
        });

        //update the seen by array.
        await prisma.chat.update({
            where:{
                id:req.params.id,
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })

        res.status(200).json(chat)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:"Failed to add chat!"
        })
    }

}

exports.addChat= async(req,res)=>{
    const tokenUserId = req.userId;

    try{
        const newChat = await prisma.chat.create({
            data:{
                userIDs: [tokenUserId,req.body.receiverId]
            }
        })
        res.status(200).json(newChat); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:"Failed to add chat!"
        })
    }
}

exports.readChat= async(req,res)=>{

    const tokenUserId = req.userId;

    try{
        // users reads the chat what happen is the seen by array gets updated.
       const chat = await prisma.chat.update({
        where:{                   // this helps in getting the chat which have id, userIDs as provided.
            id:req.params.id,
            userIDs:{
                hasSome:[tokenUserId]
            },  
        },
        data:{                          // this helps in updating the data. that is pushing the tokenUserId in the seen by array.
            seenBy:{
                set:[tokenUserId],     
            }
        }
       })
       res.status(200).json(chat)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:"Failed to read chat!"
        })
    }


}
