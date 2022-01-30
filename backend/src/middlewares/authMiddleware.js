import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import config from '../config/index.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export const admin = (async (req, res, next) => {
    // Verificar si en el req vienen el objeto user
    // con la propiedad isAdmin en true 
    // y asignar el next() 
    // Sino retornar status 401
    // Y arrojar el error: 'Not authorized as an admin' 
    req.user = await User.findById(req.user._id);
    if (req.user.isAdmin === true) {
        return next();
    }
    else {
        return res.status(401).json({ msg: 'User no authorization, need user Admin' });
    }
});
