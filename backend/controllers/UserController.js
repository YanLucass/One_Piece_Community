//models
import User from '../models/User';

import jwt from 'jsonwebtoken'
import bcrypt, { genSalt } from 'bcrypt'
import createUserToken from '../helpers/create-user-token';
import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/getUser-by-token';

class UserController {
    
    //create a user
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
        if(userEmail) {
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
        if(req.file) {
            user.image = req.file.filename;
        }
          
        try {
            const newUser = await User.save(user);
            const token = await createUserToken(newUser, req, res);
          
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Erro ao salvar o usuario!"});            
        }
        return
    }

    //login
    static async login(req, res) {

        const {email, password} = req.body;

        if(!email) {
            res.status(422).json({message: "Email obrigatório!"});
            return;
        }

        if(!password) {
            res.status(422).json({message: "Senha obrigatória!"});
            return;
        }


        const user = await User.findUserByEmail(email);

          //if don't exists this email
          if(!user) {
            res.status(422).json({message: "Esse usuario não existe!"});
            return;
        }
        
       
        //check if passwords matchs
        const checkPassword = await bcrypt.compare(password, user.password);
   

        if(!checkPassword) {
            res.status(422).json({message: "Senha incorreta!"});
            return;
        }
         
        try {
                                                                                                                           await createUserToken(user, req, res);
        
        } catch(err) {
            return res.status(500).json( {message: "Ocorreu um erro tente novamente mais tarde!"});
        }

    }

    //edit user
   static async editUser(req, res) {   
    
        const { name, email, password, confirmPassword} = req.body;
        let image = ''; // to multer case user don't provider a photo
         
        const token = getToken(req);
        
        const user = await getUserByToken(token)


        if(req.file) {
           user.image = req.file.filename;
        }
        
        if(!name) {
            res.status(422).json({message: "Nome é obrigatório!"});
            return;
        }

        user.name = name;

        if(!email) {
            res.status(422).json({message: "Email obrigatório!"});
            return;
        }

        //check if email belongs an another user
        const emailOwnerUser = await User.findUserByEmail(email);

        if(user.email !== email && emailOwnerUser) {
            res.status(422).json({message: "Por favor utilize outro email!"});
            return;
        }

        user.email = email;

        //password matchs?
        console.log(password, confirmPassword);
        if(password != confirmPassword) {
            res.status(422).json({message: "As senhas devem ser iguais"});
            return;
        
        //users wants to change password!
        } else if(password !== undefined) {
            const salt = await bcrypt.genSalt(12);
            const newPassword = await bcrypt.hash(password, salt);
            user.password = newPassword;
        }

        try {
            const userWithoutPassword = {...user};
            delete userWithoutPassword.password;
            await User.updateUserById(user)
            res.status(200).json({message: "Usuario atualizado!", userWithoutPassword});
        }
        catch(err) {
            return res.status(500).json({message: "erro ao atualizar o usuário, tente mais tadr"});
        }

   }

    static async getOneUser(req, res) {
        //get user
        const token = getToken(req);
        const user = await getUserByToken(token);
        delete user.password
        try {
            return res.status(200).json({message: user});
        } catch(err) {
            return res.status(500).json({message: 'ops algo deu errado, tente mais tarde'});
        }
       

    }
}


export default UserController;