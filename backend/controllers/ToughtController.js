//models
import Toughts from "../models/Toughts";
//utils
import getUserByToken from '../helpers/getUser-by-token';
import getToken from '../helpers/get-token';
import validId from '../helpers/valid-id'
import Like from "../models/Like";

class ToughtController {
    
    static async createTought(req, res) {
      const { title, content } = req.body;

      if(!content) {
         res.status(422).json({message: "Hey! digite um conteudo para sua publicação"});
         return;
      }

      //get user id.
      const token = getToken(req);
      const user = await getUserByToken(token);

      
      const tought = {
        title, content,
        userId: user.id
      }

      try {
          await Toughts.saveTought(tought);
          return res.status(200).json({message: "Habilidade pensante desbloqueada!"});
      }
      catch(err) {
         return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde."});
      }

    }

    // get all toughts
    static async getAll(req, res) {
        try {
            const toughts = await Toughts.getAllThoughts()
            res.status(200).json({toughts});
        } catch(err) {
            console.log('Deu erro', err);
        }
    }

    //get user toughts
    static async showUserToughts(req, res) {
      //get user
      const token = getToken(req);
      const user = await getUserByToken(token);

      //search toughts
      const userToughts = await Toughts.getUserToughts(user.id);
      res.status(200).json({message: userToughts});

    }

    //edit
    static async editThought(req, res) {

        const { id } = req.params;
        const { title, content } = req.body;
    

        if(!content) {
          res.status(422).json({message: 'Hey, forneça um conteudo a sua postagem :)'});
          return;
        }

        //get current user id, to compare with tought user_id

        //procurar o pensamento com id forncecido, e que esse pensamento tenha o user_id obtido
        const token = getToken(req);
        const user = await getUserByToken(token);
        const thoughtToEdit = await Toughts.getUserThoughtById(id, user.id);

        if(thoughtToEdit.length === 0) {
          res.status(403).json({message: 'Você só pode editar suas publicação'});
          return; 
        }

        const thougth = thoughtToEdit[0];
        
        if(title) {
          thougth.title = title;
        }

        thougth.content = content;
        try {
          const editedThought = await Toughts.editUserThought(thougth);
          return res.status(200).json({message: 'Pensamento atualizado com sucesso', editedThought});
        }

        catch(err) {
          console.error('erro ao editar o pensamento', err);
          return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde!"});
        }
       
    }

    //add like to tought
    static async addLikeTought(req, res) {
        //pegar o publicação atual
        const { id } = req.params;
        const tought = await Toughts.getById(id);

        if(!tought) {
          res.status(404).json({message: "Você não pode dar like numa publicação que não existe"})
          return;
        }
        
        //inserir novo like no bd
        const like = {
          toughtId: tought.id
        }
  
        try {
          await Like.addLike(like);
          return res.status(201).json({message: "Like adicionado com sucesso"});
        } 
        catch(err) {
         return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde"});
        }
    }


    //getQtdLike function
    static async getQtdLikesTought(req, res) {
        const {id} = req.params;
        try {
          const qtdLikes = await Like.getQtdLike(id);
          return res.status(200).json(qtdLikes);

        } catch (err) {
          return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde"});
        }
    }

    //remove like function
    static async removeLikeTought(req, res) {
        const {id} = req.params;
    
        //pegar publicação pelo id
        const tought = await Toughts.getById(id);

        //caso não exista
        if(!tought) {
          res.status(404).json({message: "Você não pode dar like numa publicação que não existe"})
          return;
        }

        try {
          const log = await Like.removeLike(id);
        
          return res.status(200).json({message: 'Like removido com sucesso'});    
        } 
        catch(err) {
          return res.status(500).json({message: "Algo deu errado, tente novamente mais tarde"});
        }
    }


    //delete 
    static async deleteTought(req, res) {
        const { id } = req.params;

       //checks if the user_id of the thought matches the id of the logged in user
       const token = getToken(req);
       const user = await getUserByToken(token);

       const toughtDelete = await Toughts.getUserThoughtById(id, user.id);

       //case logged user don't owner of thought
       if(toughtDelete.length === 0) {
          res.status(403).json({message: "Você só pode deletar os seus pensamentos!"});
          return;
       }

       try {
          const result = await Toughts.deleteTought(id);
          return res.status(200).json({message: "Pensamento deletado com sucesso!"});
       }
       catch(err) {
          console.log("Erro ao deletar pensamento", err);
          return res.status(500).json({message: "Algo deu errado tente novamente mais tarde!"});
       }

    }

    static async getOneTought(req, res) {
       const id = req.params.id;
       const token = getToken(req);
       const user = await getUserByToken(token);

       //check if the thought of this id has a user id equal to the logged in user
       const toughtBelongsToUser = await Toughts.getUserThoughtById(id, user.id);

       if(toughtBelongsToUser.length === 0) {
        res.status(403).json({message: "Você só pode editar os seus pensamentos!"});
        return;
       }

       try {
          const tought = await Toughts.getById(id);
          return res.status(200).json({message: tought});
       } catch (err) {
         console.log("Erro ao pegar o  pensamento", err);
         return res.status(500).json({message: "Algo deu errado tente novamente mais tarde!"});
       }
    }
}


export default ToughtController;