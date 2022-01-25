import asyncHandler from "express-async-handler";
import generateToken from "../common/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// ***************** LOGIN ***********************

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ***************** REGISTER ***********************
// @desc Register a new uer
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const useExists = await User.findOne({ email });
  if (useExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//GET USUARIOS
export const getUsers = asyncHandler(async (req, res) => {
  var users = await User.find();
  res.status(200);
  res.json(users);
});

// ************* GET user usando token **************
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
    //Usar findById
    // Enviar un res.json({}) que contenga: _id, name, email, isAdmin
    // En caso de error devolver status 404 y arrojar el error: 'User not found'
    //console.log(req.user);
    const userExists = await User.findById(req.user._id);
    if(userExists){
        res.json(userExists);
    } else {
        res.status(400);
        throw new Error('User no found');
    }    
});

//update por id

export const updateUser = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const user = await User.findById(req.params.id);
  // const user  = new User(req.body);

  // const {name,email } = req.body;
  // const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, salt);
    try {
      await User.updateOne({ _id: req.params.id }, user);
      res.status(200)
      res.json({
        status: "1",
        msg: "User updated",
      });
    } catch (error) {
      res.status(404)
      res.json({
        status: "0",
        msg: "Error processing operation.",
      });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
