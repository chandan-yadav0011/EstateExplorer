import React, { useContext, useState } from 'react';
import './chat.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import {format} from 'timeago.js'
import { SocketContext } from '../../context/SocketContext';
//import { message } from '../../../../server/lib/prisma';

function Chat({chats}) {

    const[chat,setChat] = useState(null);
   // console.log(chats);
    const {currentUser} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);

    const handleSubmit=async(e)=>{
        
        e.preventDefault();

        const formData= new FormData(e.target);

        const text= formData.get('text');
        console.log(text);

        if(!text){
            return ;
        }
        try{
            

            const res= await apiRequest.post('/messages/' + chat.id,{text});
            
            console.log(res);
            //update message array.

            setChat((prev)=>({...prev,messages:[...prev.messages,res.data]}));
            e.target.reset()
        }
        catch(err)
        {
            console.log(err)
        }

    }

    const handleOpenChat= async(id,receiver)=>
    {
        try{
            const res = await apiRequest('/chats/'+id);
            console.log(res);
            setChat({...res.data,receiver})
        }
        catch(err)
        {
            console.log(err);
        }
    }
    console.log(chat)


    return (
        <div className='chat'>
            <div className='messages'>
                <h1>Messages</h1>
                {
                    chats.map((c)=>(

                        <div className='message' 
                            key={c.id}
                            onClick={()=>handleOpenChat(c.id,c.receiver)}
                        >
                            <img
                                src={c.receiver.avatar||'/noavatar.jpg'}
                                alt='img'
                            />
                                <span>{c.receiver.username}</span>
                                <p>{c.lastMessage}</p>
                        </div>  
                    ))
                }



            </div>

            {/* <div className='chatBox'>
                Box
            </div> */}

           {chat  &&<div className='chatBox'>
                <div className='top'>
                    <div className='user'>
                        <img src={chat.receiver.avatar||'/noavatar.jpg'} alt=''/>
                        {chat.receiver.username}
                    </div>

                    <span className='close' onClick={()=>{setChat(null)}}>X</span>
                </div>
                <div className='center'>

                    {
                        chat.messages.map((msg)=>(
                            <div className='chatMessage'
                                style={{
                                    alignSelf:msg.userId===currentUser.id?"flex-end":"flex-start",
                                    textAlign:msg.userId===currentUser.id?"right":"left"
                                }} 
                                key={msg.id}
                            >
                                <p>{msg.text}</p>
                                <span>{format(msg.createdAt)}</span>
                            </div>
                        ))
                    }

                    
                </div>
                <form onSubmit={handleSubmit} className='bottom'>
                    <textarea name='text'></textarea>
                    <button>Send</button>
                </form>
            </div>}
            
        </div>
    );
}

export default Chat;