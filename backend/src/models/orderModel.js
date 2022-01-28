import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            // Ref a user
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [
            {
                name: { type: String, required: true }, // name: Texto, requerido
                qty: { type: Number, required: true }, // qty: Numero, requerido 
                image: { type: String, required: true }, // image: Texto, requerido 
                price: { type: Number, required: true },// price: Numero, requerido
                // product: Ref a Product
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                }
            },
        ],
        shippingAddress: {
            address: { type: String, required: true }, // address: Texto, requerido 
            city: {type: String, required: true }, // city: Texto requerido 
            postalCode: { type: String, required: true}, // postalCode: Texto requerido
            country: { type: String, required: true} // country: Texto requerido
        },
        paymentMethod: {
            // Texto requerido 
            type: String,
            required: true
        },
        paymentResult: {
            id: {type: String }, // id: Texto 
            status: {type: String }, // status: Texto
            upadate_Time: { type: String }, // update_time: Texto 
            email_address: { type: String }, // email_address: Texto
        },
        taxPrice: {
            type: Number, // Numero, requerido // Default 0.0 
            required: true, 
            default: 0.0,
        },
        shippingPrice: {
            type: Number, // Numero, requerido // Default 0.0 
            required: true, 
            default: 0.0,            
        },
        totalPrice: {
            type: Number, // Numero, requerido // Default 0.0 
            required: true, 
            default: 0.0,            
        },
        isPaid: {
            type: Boolean, // Boolean, requerido // Default false 
            required: true, 
            default: false,
        },
        piadAt: {
            //value: Date.now() // Fecha
            type: Date,
            required: false
        },
        isDelivered: {
            type: Boolean, // Boolean, requerido // Default false 
            required: true, 
            default: false,            
        },
        deliveredAt: {
            //value: Date.now() // Fecha
            type: Date,
            required: false
        },
    },
    {
        timestramps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;