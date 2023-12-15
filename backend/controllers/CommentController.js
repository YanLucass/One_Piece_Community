import Toughts from '../models/Toughts'
import Comment from '../models/Comment';


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

        //new tought to save
        const newTought = {
            content,
            toughtId: tought[0].id,
            userId: tought[0].user_id
        }

        console.log(newTought);

        try {
            const showTought = await Comment.saveComment(newTought);
            return res.status(201).json({message: "Novo comentário adicionado:", showTought});
        } 
        catch(err) {
            return res.status(500).json({message: "Algo deu errado tente novamente mais tarde!"});
        }
    }


    //getAllComments
    static async getAllComments(req, res) {
        
    }

}

export default CommentController;