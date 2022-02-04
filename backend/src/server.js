import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import config from './config/index.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path';

//Created server
const server = express();

//Parse JSON 
server.use(express.json());

// Logger 
if (config.nodeEnv === 'development') {
    server.use(morgan('dev'));
}

//DB Connection 
connectDB();

// Config Headers 
server.use((req, res, next) => {
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
server.use(config.api.prefix, routes);

// Upload folder
const __dirname = path.resolve();
server.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// Front end production 

// // Api status
// server.get(config.api.prefix, (req, res) => {
//     res.send('API is running... ');
// });

// Frontend production
if (config.nodeEnv === 'production') {
    server.use(express.static(path.join(__dirname, 'frontend/build')));
    server.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    // API status
    server.get(config.api.prefix, (req, res) => {
        res.send('API is running...');
    });
}

// Middlwares 
server.use(notFound)
server.use(errorHandler)

// Export server 
export default server;