import { Server } from "socket.io";
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection",(socket)=>{
    console.log(socket.id);
})
let onlineUser = [];

const addUser = (userId, socketId) =>  {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(receiverId);
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("8800");
