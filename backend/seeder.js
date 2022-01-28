import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './src/data/user.js';
import products from './src/data/products.js';
import User from './src/models/userModel.js';
import Product from './src/models/productModel.js';
import Order from './src/models/orderModel.js';
import connectDB from './src/config/db.js';

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Users", users);
        const createdUsers = await User.insertMany(users);
        console.log();
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map( (product) => {
            return { ...product, user: adminUser };
        }); 

        await Product.insertMany(sampleProducts);
        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    // Usar un bloque try-catch
    // Usar deleteMany para Order, Product y User 
    // Mostrar log de 'Data destroyed!' 
    // Lanzar process.exit() 
    // Si surge un error mostrar log del error 
    // Y lanzar process.exit(1)
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data destroyed!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);        
    }
}; 

if (process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}
