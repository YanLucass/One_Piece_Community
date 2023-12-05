//models
import Toughts from "../models/Toughts";
//utils
import getUserByToken from '../helpers/getUser-by-token';
import getToken from '../helpers/get-token';

class ToughtController {
    
    static async createTask(req, res) {
      const { title, content } = req.body;

      if(!content) {
         res.status(422).json({message: "Hey! digite um conteudo para sua publicação"});
         return;
      }

      //get user id.
      const token = getToken(req);
      const user = await getUserByToken(token);
      console.log(user.id);
      
      const tought = {
        title, content,
        userId: user.id
      }

      try {
          await Toughts.saveTought(tought);
          res.status(200).json({message: "Habilidade pensante desbloqueada!"});
      }
      catch(err) {
        console.log(err);
      }

    }
}


export default ToughtController;