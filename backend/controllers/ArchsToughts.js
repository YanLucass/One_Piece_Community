import getToken from "../helpers/get-token";
import getUserByToken from "../helpers/getUser-by-token";
import Wano from "../models/Wano";
import commentInArch from "../helpers/comment-Archs";


class ArchsToughts {

    static async saveWano(req, res) {
        //calling function to add comments
        await commentInArch(req, res, 'Wano');
      
    }

    static async getAllWanoToughts(req, res) {
        try {
            const toughsWano = await Wano.getAllWanoTought();
            return res.status(200).json({message: "Pensamentos de wano:", toughtsWano: toughsWano})
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({message: "Erro ao listar todos pensamentos de wano"});
        }
    }
}

export default ArchsToughts;