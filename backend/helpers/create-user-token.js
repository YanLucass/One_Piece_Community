import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const createUserToken = async(user, req, res) => {
    console.log(user);
    //build token
    const token = jwt.sign({
        name: user.name,
        id: user.id,
    }, process.env.SECRET)

    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user.id, //optional 
    });
    return token
}

export default createUserToken;