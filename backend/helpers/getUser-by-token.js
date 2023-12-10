import jwt from 'jsonwebtoken';
import User from '../models/User';

const getUserByToken = async (token) => {
    if(!token) {
        return res.status(401).json({message: 'Acesso negado!'});
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    const user = await User.findUserById(userId);
   
    return user;

}

export default getUserByToken;