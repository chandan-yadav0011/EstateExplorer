const jwt = require("jsonwebtoken");

exports.shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId)
  res.status(200).json({ message: "You are Authenticated" });
};

exports.shouldBeAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not Valid!" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    // If everything is valid, attach user information and proceed to the next middleware
    req.userId = payload.id;
    next();
  });
};
