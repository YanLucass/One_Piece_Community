import express from 'express'
import checkToken from '../helpers/verify-token';
const router = express.Router();
import ArchsToughts from '../controllers/ArchsToughts';

router.post('/wano', checkToken, ArchsToughts.saveWano);
router.get('/wano', ArchsToughts.getAllWanoToughts);


export default router;