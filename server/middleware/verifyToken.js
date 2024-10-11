const jwt = require('jsonwebtoken');
require("dotenv").config();
const cookieParser = require('cookie-parser');



exports.verifyToken = (req, res, next) => {
  console.log("inside verify")

  

  const token = req.cookies.token;

  return res.json({message:`token is :${token}`})

  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Not Authenticated!' });
  }
  
  //console.log("userID in req: ",req.userId)

  try
    {
      const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
      req.userId=decode.id; 
      console.log("going out of verify")
      next();
    }
    catch(err)
    {
       return  res.json( 
            {
              success:false,
              message:"invalid token",
              error:err
            })
    }


  

};