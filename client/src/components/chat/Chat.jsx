import React, { useState } from 'react';
import './chat.scss'
function Chat(props) {

    const[chat,setChat] = useState(true);

    return (
        <div className='chat'>
            <div className='messages'>
                <h1>Messages</h1>
                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>

                <div className='message'>
                    <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                    <span>John Doe</span>
                    <p>
                        this is john doe
                    </p>
                   
                </div>




            </div>

            {/* <div className='chatBox'>
                Box
            </div> */}

           {chat  &&<div className='chatBox'>
                <div className='top'>
                    <div className='user'>
                        <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''/>
                        John Doe
                    </div>

                    <span className='close' onClick={()=>{setChat(null)}}>X</span>
                </div>
                <div className='center'>
                    <div className='chatMessage'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage own'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage own'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage own'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>

                    <div className='chatMessage own'>
                        <p>hello</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className='bottom'>
                    <textarea></textarea>
                    <button>Send</button>
                </div>
            </div>}
            
        </div>
    );
}

export default Chat;