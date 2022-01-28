import { Router } from 'express';
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, admin, createProduct); //crear nuevo producto
router.get('/', getProducts); //obtener todos los productos
router.get('/top', getTopProducts);//obtener el top 3 de productos 
router.get('/:id', getProductById);//busqueda de producto por id
router.delete('/:id', protect, admin, deleteProduct); //borrar producto por id
router.put('/:id', protect, admin, updateProduct); //modificar un producto por id
router.post('/:id/reviews', protect, createProductReview);//crear una nueva review de un producto por idProducto

export default router;
