import getToken from "./get-token";
import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {

    //user don't token 
    if(!req.headers.authorization) {
        return res.status(401).json({message: "Acesso negado!"});
    }

    const token = getToken(req);

    //token invalid
    if(!token) {
        res.status(401).json({message: "Acesso negado!"})
        return;
    }    

    try {
        //decoded token to keep session 
        const decodedUser = jwt.verify(token, process.env.SECRET);
        req.user = decodedUser;
        next();
    } 
    catch(err) {
        return res.status(400).json({message: "Token inválido!"});
    }
}

export default checkToken;