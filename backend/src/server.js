import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import config from './config/index.js';

//Created server
const server = express();

//Parse JSON 
server.use(express.json());

// Logger 
if (config.nodeEnv === 'development'){
    server.use(morgan('dev'));
}

//DB Connection 

// Config Headers 
server.use( (req, res, next) => {
    // from where can I access
    res.header('Access-Control-Allow-Origin', '*');
    // type of headers 
    res.header('Access-Control-Allow-Headers', 'content-type, authorization');
    // type of methods
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    // next event
    return next();
});

// Use routers

// Upload folder

// Front end production 

// Api status
server.get(config.api.prefix, (req, res) => {
    res.send('API is running... ');
});

// Middlwares 

// Export server 
export default server;