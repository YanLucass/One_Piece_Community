import express from 'express'
import UserController from '../controllers/UserController';
const router = express.Router();

router.get('/register', UserController.register);

export default router;