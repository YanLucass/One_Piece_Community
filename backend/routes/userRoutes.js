import express from 'express'
import UserController from '../controllers/UserController';
import imageUpload from '../helpers/image-upload';
const router = express.Router();

router.post('/register', imageUpload.single("image"), UserController.register);
router.get('/oi', UserController.oi);

export default router;