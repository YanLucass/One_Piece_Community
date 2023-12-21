import Toughts from '../models/Toughts'
import Comment from '../models/Comment';
import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/getUser-by-token'


class CommentController {

    static async createComment(req, res) {

        const id = req.params.id;
        const {content} = req.body;

        if(!content) {
            res.status(422).json({message: "Por favor insira um conteudo!"});
            return;
        }

        //check if toughts exists
        const tought = await Toughts.getById(id);

        if(tought.length === 0) {
            res.status(404).json({message: "Essa publicação não existe ou foi excluida!"});
            return;
        }


        //pegar usuario atual para inserir no comentáripo
        const token = getToken(req);
        const user = await getUserByToken(token);
        console.log(user);
    
        //new tought to save
        const newTought = {
            content,
            toughtId: tought.id,
            userId: user.id
        }   

        try {
            const createdTought = await Comment.saveComment(newTought);
            return res.status(200).json({message: "Novo comentário adicioado!", createdTought});
        } catch (error) {
            return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde"});
        }

  
    }

    //getAllComments
    static async getAll(req, res) {
        const toughtId = req.params.id;
        try {
            const comments = await Comment.getAllComments(toughtId);

            //case do'nt comments
            if(comments.length === 0) {
                res.status(404).json({message: "Esse pensamento não existe ou foi excluido ou não tem comentários!"});
                return;
            }

            return res.status(200).json({message: "Comments:", comments});
        }
        catch(err) {
            return res.status(500).json({message: "Algo deu errado tente novamente mais tarde!"});
        }
    }

}

export default CommentController;