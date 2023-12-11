import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import Input from '../../form/Input';
import { useParams } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

function EditThought() {
    const {id} = useParams();
    const [token] = useState(localStorage.getItem('token') || '');
    const [thoughtEdit, setThoughtEdit] = useState({});
    const { setFlashMessage} = useFlashMessage();


    function onChange(e) {
        setThoughtEdit({...thoughtEdit, [e.target.name]: e.target.value});
    }


   async function editUser() {

        let msgText = 'pensamento atualizado com sucesso';
        let msgType = 'success'
        try {
            const response = await api.patch(`/toughts/edit/${id}`, thoughtEdit, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })  

        } catch(err) {
            msgText = err.response.data.message;
            msgType = 'error'        
        }

        setFlashMessage(msgText, msgType);
               
   }
    

    async function submit(e) {
        e.preventDefault();
        editUser();
       
    }

    return( 
        <div>
            <h1>Editar Pensamento</h1>
            <Input
                type='text'
                text='Título:'
                name='title'
                id='title'
                placeholder='Digite um titulo para seu pensamento(opcional)'
                handleOnChange={onChange}
            />

            <Input
                type='text'
                text='Conteudo: *'
                name='content'
                id='content'
                placeholder='Adicione um conteúdo a sua publicação'
                handleOnChange={onChange}
            />

            <input type="submit" value="Editar" onClick={submit}/>

        </div>
    )

}

export default EditThought;