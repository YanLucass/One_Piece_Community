import Wano from "../models/Wano";
import getToken from "./get-token";
import getUserByToken from "./getUser-by-token";

const commentInArch = async function(req, res, arch) {
    const {title, content} = req.body;

    if(!content) {
       res.status(422).json({message: "Hey forneça um conteudo para sua publicação :)"});
       return;
    }   

    //get current usert to field "user_id" in wanoToughts table
    const token = getToken(req);
    const user = await getUserByToken(token);

    const tought = {
        title,
        content,
        userId: user.id
    }

    let toughtArch;

    //save in corresponding arc
    switch(arch) {
        case 'Wano':
            toughtArch = await Wano.save(tought);
        break;
    }

    //return toughtArch to display.
    return res.status(201).json({message: "Comentário adicionado com sucesso:", tought});


}

export default commentInArch;