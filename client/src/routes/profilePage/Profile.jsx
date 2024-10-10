import React, { useContext, useEffect } from 'react';
import './Profile.scss'
import List from '../../components/list/List';
import Chat from '../../components/chat/Chat';

import apiRequest from '../../lib/apiRequest';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



function Profile(props) {


    const{updateUser,currentUser}= useContext(AuthContext);
    const data  = useLoaderData();
    console.log(data); 
    console.log(data.res.data.savedPosts)     
    const navigate = useNavigate();
    console.log(data.res.data.userPosts)
    console.log(data.chatRes)
    
    const handleLogout = async()=>{
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            localStorage.removeItem("user")
            navigate("/");
          } catch (err) {    
            console.log(err);
          }
    }
    return (
        <div className='profilePage'>
            <div className='details'>
                <div className='wrapper'>
                    <div className='title'>
                        <h1>User Information</h1>

                        <Link to="/profile/update">
                        <button>Update profile</button>
                        </Link>
                    </div>

                    <div className='info'>
                        <span style={{display:'flex' ,flexDirection:'column'}}>
                            Avatar: 
                            <img src={currentUser.avatar||"/noavatar.jpg"} alt=''/>
                            <span>Username: <b>{currentUser.username}</b></span>
                            <span>E-mail: <b>{currentUser.email}</b></span>
                            <button onClick={handleLogout}>Logout</button>
                        </span>
                    </div>

                    <div className='title'>
                        <h1>My List</h1>
                        <Link to= '/add'>
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    
                   
                       <List posts={data.res.data.userPosts}/>
                    


                    <div className='title'>
                        <h1>Saved List</h1>
                    </div>
                        
                    <List posts={data.res.data.savedPosts}/>
                   


                </div>
            </div>
            <div className='chatContainer'>
                <div className='wrapper'>
                    <Chat chats= {data.chatRes.data}/>
                </div>
            </div>

        </div>
    );
}

export default Profile;