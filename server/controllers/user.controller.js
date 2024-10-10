const prisma = require("../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv');

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users); // Ensure response is returned
  } catch (err) {
    console.error(err); // Use console.error for error logging
    return res.status(500).json({ message: "Failed to get users!" });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return res.status(200).json(user); // Ensure response is returned
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get user!" });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  const { password, avatar, ...inputs } = req.body;
  console.log(id);
  console.log(tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    return res.status(200).json(rest); // Ensure response is returned
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update user!" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({ message: "User deleted" }); // Ensure response is returned
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete user!" });
  }
};

exports.savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  console.log("postID inside save Post",postId);
  console.log("tokenUSerId inside save Post",tokenUserId);
  if (!postId || !tokenUserId) {
    return res.status(400).json({ message: "Post ID or User ID is missing" });
  }

  try {
    // Check if the post is already saved
    const savedPost = await prisma.savedPost.findFirst({
      where: {
          userId: tokenUserId,
          postId: postId,
        },
      
    });

    

   

    if (savedPost) 
    {
        console.log("going to delete", savedPost);
        await prisma.savedPost.delete({
          where: {
              id: savedPost.id
          },
        })
       
      return res.status(200).json({ message: "saved Post deleted" });
    }
  
    // Try to create the saved post and handle unique constraint error
    try {
      console.log("create kr rha hu")
      
      const newSavePost = await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });

      console.log("create kr dia hu");
      console.log(newSavePost);

      
      return res.status(200).json({ message: "Post saved" });

    } catch (err) {
      if (err.code === 'P2002') {
        // Unique constraint failed, post is already saved
        console.error('Error creating saved post:', err); // Log the full error object
        return res.status(400).json({ message: "Error in saving post." });
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to save post!" });
  }
};


exports.profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    return res.status(200).json({ userPosts, savedPosts }); // Ensure response is returned
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get profile posts!" }); // Ensure response is returned
  }
};

exports.getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    return res.status(200).json(number); // Ensure response is returned
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get notification number!" }); // Ensure response is returned
  }
};
