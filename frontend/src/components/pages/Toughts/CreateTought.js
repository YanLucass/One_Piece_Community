import api from "../../../utils/api";
import Input from "../../form/Input";
import { useState, useEffect } from "react";
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate} from "react-router-dom";

function CreateTought() {
    const navigate = useNavigate();
    const [tought, setTought] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();

    function onChange(e) {
        setTought({...tought, [e.target.name]: e.target.value})
    }

    async function submit(e) {
        e.preventDefault();
        let msgType = 'success'
        let msgText = 'Habilidade pensante desbloqueada!'
        
        try {
            const response = await api.post('/toughts/create', tought,{
                headers: {
                    Authorization: `{Bearer ${JSON.parse(token)}`
                }
            })
            const data = response.data;
            navigate('/')
        }
        catch(err) {
            msgType = 'error'
            msgText = err.response.data.message;
        }
        setFlashMessage(msgText, msgType);
     
    }


 
    return (
        <div>
        <h1>Criar publicação</h1>
        <Input 
            type='text'
            text='Titulo:'
            name='title'
            id='title'
            placeholder='Digite um titulo para sua postagem (opcional)'
            handleOnChange={onChange}
        />

        <Input 
            type="textarea"
            text='Conteudo:'
            name='content'
            id='content'
            placeholder='Descreva sua postagem'
            handleOnChange={onChange}
            
        />

        <input type="submit" onClick={submit} value='Enviar' />

        </div>
    )
}

export default CreateTought;