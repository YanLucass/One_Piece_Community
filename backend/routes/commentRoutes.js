import express from 'express';
import checkToken from '../helpers/verify-token';
const router = express.Router();

import CommentControler from '../controllers/CommentController';

//create comment
router.post('/create/:id', checkToken, CommentControler.createComment);

export default router;