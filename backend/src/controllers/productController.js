import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumer) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $option: 'i',
            },
        }
        : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export const getProductById = asyncHandler(async (req, res) => {
    //console.log(req.product);
    const productExists = await Product.findById(req.params.id);
    if (productExists) {
        res.json(productExists);
    } else {
        res.status(404);
        throw new Error('Product no found');
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {

    console.log("ID ", req.params.id);
    const product = await Product.findById(req.params.id);
    console.log("PRODUCTO ", product);
    if (product) {
        const removedProdcut = await Product.deleteOne(product);
        console.log("Producto eliminado", removedProdcut);
        res.status(200);
        res.json({
            status: "1",
            msg: "Product Removed",
        });
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});

export const createProduct = asyncHandler(async (req, res) => {
    const product = req.body;
    const createProduct = await Product.create(product);
    res.status(201).json(createProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {

    const productExists = await Product.findById(req.params.id);

    if (productExists) {
        productExists.name = req.body.name || productExists.name;
        productExists.image = req.body.image || productExists.image;
        productExists.brand = req.body.brand || productExists.brand;
        productExists.category = req.body.category || productExists.category;
        productExists.description = req.body.description || productExists.description;
        productExists.price = req.body.price || productExists.price;
        productExists.countInStock = req.body.countInStock || productExists.countInStock;

        await productExists.save();
        res.status(200).json({
            name: productExists.name,
            image: productExists.image,
            brand: productExists.brand,
            category: productExists.category,
            description: productExists.description,
            price: productExists.price,
            countInStock: productExists.countInStock,
        });


    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});


export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ 'rating': 'desc' }).limit(3);
    //const products = await Product.find();
    //const product = products.sort(((a, b) => b.rating - a.rating)).slice(0, 3);

    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('0 products founded');
    }
});


