// const express = require('express');

// import {
//   getChats,
//   getChat,
//   addChat,
//   readChat,
// } from "../controllers/chat.controller.js";

// import { verifyToken } from "../middleware/verifyToken.js";

// const router = express.Router();

// router.get("/", verifyToken, getChats);
// router.get("/:id", verifyToken, getChat);
// router.post("/", verifyToken, addChat);
// router.put("/read/:id", verifyToken, readChat);

// export default router;

const express = require('express');
const {
  getChats,
    getChat,
    addChat,
    readChat,
} = require("../controllers/chat.controller.js");
const{verifyToken} = require("../middleware/verifyToken.js")

const router = express.Router();
 router.get("/", verifyToken, getChats);
 router.get("/:id", verifyToken, getChat);
 router.post("/", verifyToken, addChat);
 router.put("/read/:id", verifyToken, readChat);


module.exports= router;