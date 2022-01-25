import {Router} from 'express'; 
import {registerUser, authUser, getUsers, getUserProfile,updateUser} from '../controllers/userController.js'; 
import { protect } from '../middlewares/authMiddleware.js';

const router = Router(); 
 
router.post('/',registerUser); //registrar
router.post('/login',authUser); //loguear
router.get('/profile', protect, getUserProfile); //GET usuario usando token
router.get('/',getUsers);//obtener todos los usuarios
//router.get('/:id',getUser);//obtener usuario por id
router.put('/:id',updateUser);//modificar usuario por id
export default router;
