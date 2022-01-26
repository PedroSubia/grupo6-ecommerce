import {Router} from 'express'; 
import {registerUser, authUser, getUsers, getUserProfile,updateUserProfile, deleteUser, getUserById} from '../controllers/userController.js'; 
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = Router(); 
 
router.post('/',registerUser); //registrar
router.get('/',protect, admin, getUsers);//obtener todos los usuarios
router.post('/login',authUser); //loguear
router.get('/profile', protect, getUserProfile); //GET usuario usando token
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.get('/:id', protect, admin, getUserById);

//router.get('/', protect, admin, getUsers);
//router.get('/:id',getUser);//obtener usuario por id
// router.put('/:id',updateUser);//modificar usuario por id
export default router;
