import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false); // começar não autenticado
    const { setFlashMessage} = useFlashMessage();
    const navigate = useNavigate();

    //Função Lidar com rotas protegidas, caso tenha token no localStorage vamos alterar o authorization da API, para passar.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) { 
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            //default para cofnigurar todo o defaults(objeto que contém o cabeçalho padrão para todas requisições que essa instância "api" do axios pode fazer. Ou seja define o token para todas requisições futuras que o o "api fizer"
            setAuthenticated(true);
        }
    }, []);

    //registar um usuario e salvar o token dele na localStorage
    async function registerUser(user) {
        let msgText = 'Cadastrado com sucesso';
        let msgType = 'success';

        try {

            const formData = new FormData();

            await Object.keys(user).forEach((key) => 
                
                formData.append(key, user[key])
                
            )

            console.log(formData);
            //consumir api
            const data = await api.post('/users/register', formData).then((response) => {
                console.log(response);
                return response.data;
            })
            
            //inserir o token na localStorage
            await insertTokenToUser(data);

        } catch(err) {
            console.log(err);
            msgText = err.response.data.message;
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType);
    }

    //função de login
     
    //autenticar o usuario, salvando o token na localStorage
    async function insertTokenToUser(data) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
        
    }
    

    return { authenticated, registerUser}
 }


