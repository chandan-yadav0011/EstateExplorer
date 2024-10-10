const prisma = require("../lib/prisma");
const jwt=  require("jsonwebtoken");

exports.getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
 
  try {
      const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    return res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);       
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    // If a token exists, verify it first
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        console.log(payload.id);
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });

          // Send response when token is valid
          return res.status(200).json({ ...post, isSaved: saved ? true : false });
        } else {
          // If token verification fails, return an error or continue as unauthenticated
          return res.status(200).json({ ...post, isSaved: false });
        }
      });
    } else {
      // If no token, respond with isSaved: false
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};



exports.addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update posts" });
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};