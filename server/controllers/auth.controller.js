const express = require('express');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
      
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create user!" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    // const age = 1000 * 60 * 60 * 24 * 7;

   // console.log("user information",user);
    const payload = {
      id:user.id,
      isAdmin: false,
    }

    //console.log("payload: ",payload.id);

    const options ={
        expiresIn: '3d'
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,options);
    

    // //-----------------------
    //   const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
    //   console.log("decode: ",decode)
    // //----------------------

    console.log(token)

    const { password: userPassword, ...userInfo } = user;

    console.log("hello")

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to login!" });
  }
};

exports.logout = (req, res) => {
  return res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};