//models
import User from '../models/User';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {
    
    static async register(req, res) {
        const {name, email, password, confirmPassword} = req.body;

        //validations
        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!email) {
            res.status(422).json({message: "O email é obrigatório"});
            return;
        }


        if(!password) {
            res.status(422).json({message: "a senha é obrigatória"});
            return;
        }

        if(!confirmPassword) {
            res.status(422).json({message: "a senha confirmação de senha é obrigatoria"});
            return;
        }
        
        //check if email exists
        const userEmail = await User.findUserByEmail(email); //receives the array of result lines
        
        //if result lines greater than zero
        if(userEmail.length > 0) {
            res.status(422).json({message: "Por favor escolha outro email!"});
            return;
        }

        //check passwrod matchs
        if(password != confirmPassword) {
            res.status(422).json({messsage: "as senhas não são iguais!"});
            return;
        }

        //create password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = {
            name, email, 
            password: hashedPassword
        }

        console.log(user);

        try {
            const newUser = await User.save(user);
            res.status(200).json({message: "Usuario cadastrado com sucesso!", newUser});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Erro ao salvar o usuario!"});            
        }

    }
}
export default UserController;