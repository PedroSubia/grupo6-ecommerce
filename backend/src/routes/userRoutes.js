import { Router } from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = Router();

router.post('/', registerUser);
router.post('/login', authUser);

export default Router;