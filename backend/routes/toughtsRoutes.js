import express from 'express'
const router = express.Router();


//controllers 
import ToughtController from '../controllers/ToughtController'

// Middlewares
import checkToken from '../helpers/verify-token';

router.post('/create', checkToken, ToughtController.createTask);

export default router;