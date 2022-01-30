import { Router } from 'express';
import { upload, uploadConfig } from '../controllers/uploadController.js';
import { uploads3, uploadsConfigs3 } from '../controllers/uploadS3Controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, admin, uploadConfig.single('file'), upload); //subir archivo
router.post('/aws', protect, admin, uploadsConfigs3, uploads3); //subir archivo en amazon s3

export default router;
