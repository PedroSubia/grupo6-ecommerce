import {Router} from 'express'; 
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = Router(); 
 
router.get('/',getProducts); //obtener todos los productos
router.get('/:id',getProductById);//busqueda de producto por id
router.delete('/:id',deleteProduct); //borrar producto por id
router.post('/:id',protect,createProduct); //crear nuevo producto
router.put('/:id',updateProduct); //modificar un producto por id
router.post('/:id/reviews',protect,createProductReview);//crear una nueva review de un producto por idProducto
router.get('/top/top',getTopProducts);//obtener el top 3 de productos
export default router;
