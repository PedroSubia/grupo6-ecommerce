import {Router} from 'express'; 
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import {protect, admin} from '../middlewares/authMiddleware.js';

const router = Router(); 
 
router.get('/',getProducts); //obtener todos los productos
router.get('/:id',getProductById);//busqueda de producto por id
router.delete('/:id',protect,admin,deleteProduct); //borrar producto por id
router.post('/',protect,admin,createProduct); //crear nuevo producto
router.put('/:id',protect,admin,updateProduct); //modificar un producto por id
router.post('/:id/reviews',protect,createProductReview);//crear una nueva review de un producto por idProducto

router.get('/top/top',getTopProducts);//obtener el top 3 de productos 
//(La ruta es /top/top porq reconoce al top como una llamada getProductById con id = "top")

export default router;
