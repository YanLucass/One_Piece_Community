import express from 'express'
const router = express.Router();


//controllers 
import ToughtController from '../controllers/ToughtController'

// Middlewares
import checkToken from '../helpers/verify-token';

router.post('/create', checkToken, ToughtController.createTought);
//get all thoughts
router.get('/all', ToughtController.getAll);
//get thoguht by id

//get user thoughts
router.get('/userToughts', checkToken, ToughtController.showUserToughts);
//get one tought
router.get('/edit/:id', checkToken, ToughtController.getOneTought);

//get qtdLikes
router.get('/qtdLike/:id', ToughtController.getQtdLikesTought);

//edit thougt
router.patch('/edit/:id', checkToken, ToughtController.editThought);

//like a tought (add)
router.patch('/addLike/:id', checkToken, ToughtController.addLikeTought);

//remove like
router.patch('/removeLike/:id', checkToken, ToughtController.removeLikeTought);

//delete thought
router.delete('/delete/:id', checkToken, ToughtController.deleteTought);



export default router;