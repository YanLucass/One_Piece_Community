import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import Input from '../../form/Input';
import { useParams } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import { useNavigate } from 'react-router-dom';

function EditThought() {
    const {id} = useParams();
    const [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    //to old tought case have
    const [thought, setThought] = useState({});
    const [thoughtEdit, setThoughtEdit] = useState({});

    const { setFlashMessage} = useFlashMessage();


    function onChange(e) {
        setThoughtEdit({...thoughtEdit, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        api.get(`/toughts/edit/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            setThoughtEdit(response.data.message);
        })

        .catch(err => {
            console.log('Deu erro:', err);  
        })

    },[token, id]);

    console.log(thought);


   async function editThought() {

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
        navigate('/users/dashboard')
               
   }
    

    async function submit(e) {
        e.preventDefault();
        editThought()
       
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
                value={thoughtEdit.title || ''}
                handleOnChange={onChange}
            />

            <Input
                type='text'
                text='Conteudo: *'
                name='content'
                id='content'
                placeholder='Adicione um conteúdo a sua publicação'
                value={thoughtEdit.content || ''}
                handleOnChange={onChange}
            />

            <input type="submit" value="Editar" onClick={submit}/>

        </div>
    )

}

export default EditThought;