import getToken from "./get-token";
import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {

    //user don't token 
    if(!req.headers.authorization) {
        return res.status(401).json({message: "Acesso negado!"});
    }

    const token = getToken;
    console.log(token);

    //token invalid
    if(!token) {
        res.status(401).json({message: "Acesso negado!"})
        return;
    }    

    try {
        //decoded token to keep session 
        const decoded = jwt.verify(token, process.env.SECRET);
    } 
    catch(err) {
        res.status(400).json({message: "Token inválido!"});
    }
}

export default checkToken;