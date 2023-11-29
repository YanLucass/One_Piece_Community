import express from 'express'
import UserController from '../controllers/UserController';
import imageUpload from '../helpers/image-upload';
import checkToken from '../helpers/verify-token';
const router = express.Router();

router.post('/register', imageUpload.single("image"), UserController.register);
router.patch('/edit/:id', checkToken, UserController.editUser);


export default router;