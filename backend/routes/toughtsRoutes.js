import express from 'express'
const router = express.Router();


//controllers 
import ToughtController from '../controllers/ToughtController'

// Middlewares
import checkToken from '../helpers/verify-token';

router.post('/create', checkToken, ToughtController.createTought);
//get all toughts
router.get('/all', ToughtController.getAll);
//get user toughts
router.get('/userToughts', checkToken, ToughtController.showUserToughts);

export default router;