import { Router } from 'express';
import { registerUser, authUser, getUsers, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import { nodeMailer } from "../controllers/nodemailerController.js";

const router = Router();

router.post('/', registerUser, nodeMailer); //registrar
router.get('/', protect, admin, getUsers);//obtener todos los usuarios
router.post('/login', authUser); //loguear
router.get('/profile', protect, getUserProfile); //GET usuario usando token
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);

export default router;
