const express = require('express');
const app = express();
const postRoute = require('./routes/post.route');
const authRoute = require('./routes/auth.route');
const testRoute = require('./routes/test.route');
const userRoute = require('./routes/user.route');
const chatRoute = require('./routes/chat.route');
const messageRoute = require('./routes/message.route');

const cors =require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());


//for connecting with client side 
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));   // this credentials : true will help us sending the cookie to the client side.

// app.get("/",(req,res)=>{
//     res.json({message:"hii express"});
//     console.log("hi");
// })

app.use('/api/posts',postRoute);
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute);
app.use('/api/test',testRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);

app.listen(4000,()=>{
    console.log("Sever listening on port 4000!");
})

