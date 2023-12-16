import api from "../../../utils/api";
import Input from "../../form/Input";
import { useEffect, useState } from "react";

import useFlashMessage from '../../../hooks/useFlashMessage';

//component comment to tought publication.

function Comment({id}) {

    const [comment, setComment] = useState({});
    let [token] = useState(localStorage.getItem('token') || '');

    const { setFlashMessage} = useFlashMessage();

    function onChangeComment(e) {
        setComment({...comment, [e.target.name]: e.target.value});

    }

     //consume api to create comment 
     async function createComment(toughtId) {

        let msgText = 'Comentário adicionado com sucesso'
        let msgType = 'success'

        try { 
            console.log(comment);
            const response = await api.post(`/comment/create/${id}`, comment, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            const data = response.data;
        }
        catch(err) {
            msgText = err.response.data.message;
            msgType = 'error'
            console.log(err);
        }

        setFlashMessage(msgText, msgType);
    
     }


   
    function submit(e) {
        e.preventDefault();
        createComment(id);
    }

    return( 

        <form onSubmit={submit}>

        <Input 
            type='textarea'
            name='content'
            id='content'
            placeholder='Digite um conteudo para seu comentário'
            handleOnChange={onChangeComment}
        />

        <button type="submit">Comentar</button>

        </form>
    )
}

export default Comment;