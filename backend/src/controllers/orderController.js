import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

export const addOrderItems = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0 ){
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,            
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

export const getOrderById = asyncHandler(async(req,res) => {
    const orderExists = await Order.findById(req.params.id).populate({ path: 'user', select: 'name email' });
    if (orderExists && ( req.user.isAdmin === true || orderExists.user._id === req.user._id) ){
        res.status(200);
        res.json(
            orderExists
        );
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export const updateOrderToPaid = asyncHandler( async (req, res) => {
    const orderExists = await Order.findById(req.params.id); 
    if (orderExists && ( req.user.isAdmin === true || orderExists.user._id === req.user.id) ){
        orderExists.isPaid === true;
        orderExists.paidAt = Date.now();
        orderExists.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        await orderExists.save();
        res.status(200);
        res.json(
            orderExists
        );
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Update order to delivered
export const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const orderExists = await Order.findById(req.params.id);
    //console.log("usuario recibido en req: ", req.user.id);
    //console.log("usuario de la orden encontrada: ", orderExists.user._id);   
    if (orderExists && ( req.user.isAdmin === true || orderExists.user._id === req.user.id) ){
        orderExists.isDelivered = true;
        orderExists.deliveredAt = Date.now();
        await orderExists.save();
        res.status(200);
        res.json(
            orderExists
        );
    } else {
        res.status(404);
        throw new Error('Order not found');
    }    
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async(req,res) => {
    let ordenes = await Order.find({user : req.user.id});
    if (ordenes && ordenes.length>0){
        res.status(200);
        res.json(ordenes);
    } else {
        res.status(200).json({
            msg: 'Ud. no posee ordenes'
        });
    }
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async(req, res)=> {
    //let allOrders = await Order.find().populate( {path: 'user', select: 'id name'} );
    let allOrders = await Order.find().populate('user', 'id name');
    res.status(200);
    res.json(allOrders);
});
