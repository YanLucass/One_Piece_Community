import express from 'express'
import UserController from '../controllers/UserController';
import imageUpload from '../helpers/image-upload';
import checkToken from '../helpers/verify-token';
const router = express.Router();

router.post('/register', imageUpload.single("image"), UserController.register);
router.patch('/edit/:id', checkToken, imageUpload.single("image"), UserController.editUser);
router.post('/login', UserController.login);
router.get('/currentUser', checkToken, UserController.getOneUser);


export default router;