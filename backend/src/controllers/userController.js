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
export const registerUser = asyncHandler(async (req, res, next) => {
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
    // res.status(201).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user._id),
    // });
    req.newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }
    return next();
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
  if (userExists) {
    res.json(userExists);
  } else {
    res.status(400);
    throw new Error('User no found');
  }
});

// ************** update por id ****************
// @desc Update user profile
// route PUT /api/users/profile
// @access Private 
export const updateUserProfile = asyncHandler(async (req, res) => {
  // Usar findById    // Asignar los valores que vienen de la req o del usuario encontrado ej: user.name = req.body.name || user.name 
  // Si vienen el password en el req entonces asignarlo al user.password guardar el usuario actualizado con .save()
  // Enviar un res.json({}) que contenga: _id, name, email, isAdmin, token 
  // En caso de error devolver status 404 y arrojar el error: 'User not found'
  const userExists = await User.findById(req.user.id);
  if (userExists) {
    userExists.name = req.body.name || userExists.name;
    userExists.email = req.body.email || userExists.email;
    userExists.password = req.body.password || userExists.password;
    await userExists.save();
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      //password: userExists.password, // muestra la contraseña sin encriptar
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ******************* GET USUARIOS ***********************
// @desc Get all users
// @oute GET /api/users 
// @access Private/Admin 
export const getUsers = asyncHandler(async (req, res) => {
  // User find 
  // Enviar un res.json() con el resultado  
  var users = await User.find();
  res.status(200);
  res.json(users);
});

// *************** DELETE USERS *******************
// @desc Delete user 
// @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  // User findById
  // Se se encontro el usuario usar .remove()
  // Retornar un res.json({}) con el message: 'User Removed' 
  // Si no se encontro el usuario retornar status 404
  // Y arrojar el error: 'User not found'
  const user = await User.findById(req.params.id);
  if (user) {
    await User.remove(user);
    res.status(200);
    res.json({
      status: "200",
      msg: "User Removed",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// *************** GET USERS BY ID *******************
// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  // Usar findById agregandole .select() para evitar el password
  // Si existe el usuario regresar res.json() con el resultado
  // Si no existe el usuario retornar status 404 // Y arrojar el error: 'User not found' 
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ************** Update User By Id ***********************
// @desc Update user 
// @route PUT /api/users/:id 
// @access  Private/Admin 
export const updateUser = asyncHandler(async (req, res) => {
  // User findById 
  // Si se encontro el usuario entonces: 
  // user.name = req.body.name || user.name;
  // user.email = req.body.email || user.email;
  // user.isAdmin = req.body.isAdmin || user.isAdmin;
  // guardar con .save()  // Retornar un res.json({}) con contenga: _id, name, email, isAdmin
  // Si no se encontro el usuario entonces retornar status 404  // Y arrojar el error: 'User not found' 
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    userExists.name = req.body.name || userExists.name;
    userExists.email = req.body.email || userExists.email;
    userExists.isAdmin = req.body.isAdmin || userExists.isAdmin;

    await userExists.save();
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
