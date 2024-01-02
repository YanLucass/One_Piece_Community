import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const createUserToken = async(user, req, res) => {
    //build token
    const token = jwt.sign({
        name: user.name,
        id: user.id,
    }, process.env.SECRET)

    return res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user.id, //optional 
    });
    
}

export default createUserToken;