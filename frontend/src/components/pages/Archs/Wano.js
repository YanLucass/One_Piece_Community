import api from '../../../utils/api';
import { useEffect, useState } from 'react';
import useFlashMessage from '../../../hooks/useFlashMessage';

import styles from './Archs.module.css';
//image
import wano from '../../../assets/img/wano.png'

//layouts
import Input from '../../form/Input';
import RoundedImage from '../../layout/RoundedImage';

function Wano() {

    // to fill in with input values
    const [toughtArch, setToughtArch] = useState({});

    //to display all wano toughts
    const [toughtsRegistered, setToughtsRegistered] = useState([]);

    //token
    const [token] = useState(localStorage.getItem('token') || '');

    //flashMessage
    const {setFlashMessage} = useFlashMessage();

    function onChange(e) {
        setToughtArch({...toughtArch, [e.target.name]: e.target.value});
    }

    //save toughtArch function
    async function save(toughtArch) {

        let msgText = 'Pensamento adicionado com sucesso'
        let msgType = 'success'
        
        try {
            const response = await api.post(`/archs/wano`, toughtArch, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
          
            const data = response.data.tought;
            setToughtArch(data);

        
        }
        catch(err) {
            msgText = err.response.data.message
            msgType = 'error'
        }        

        setFlashMessage(msgText, msgType);
    }

  


    function submit(e) {
        e.preventDefault();
        save(toughtArch)
        
    }

    //display all wano toughts. Consume getAllWanoToughts router.
    useEffect(() => {
        api.get('/archs/wano')
        .then(response  => {
            setToughtsRegistered(response.data.toughtsWano);
        })
        
    }, [toughtArch]);


    return (    
        <div className={styles.tought_archs}>
            <h1>Compartilhe seus comentários sobre</h1>
            <h2>Wano</h2>
            <img src={wano} alt='wano background' className={styles.imgComentarios}/>
            <h3>Adicionar comentário</h3>


            <div className={styles.tought_form_container}></div>
               {/* form to add comment */}
                <form onSubmit={submit}>
                        <div className={styles.form_control}>

                            <Input 
                                type='text'
                                name='title'
                                id='title'
                                placeholder='digite um titulo (opcional)'
                                handleOnChange={onChange}
                            />

                            <Input 
                                type='textarea'
                                name='content'
                                id='content'
                                placeholder='Descreva sua publicação :)'
                                handleOnChange={onChange}
                            />

                            <input type='submit' value='publicar' />
                        </div>
                </form>

                {/* Comments section */}
                <div className={styles.comentarios}>
                    <h3>Lista de comentários</h3>

                    {/* Display toughts from wano */}
                    {toughtsRegistered.map((toughtArch, index) => (

                        <div key={index}>
                            <figure>
                                <blockquote>
                                    <RoundedImage 
                                        width='px45'
                                        src={`${process.env.REACT_APP_API}/images/users/${toughtArch.user_image}`}
                                        alt={toughtArch.user_name}
                                    />
                                      <span className={styles.comentariosUserName}>{toughtArch.user_name}</span>
                                   
                                    {toughtArch.title && <p>Título: {toughtArch.title}</p>}
                                    <p> <span className={styles.content}>Conteudo:</span>{toughtArch.content}</p>
                                </blockquote>
                            </figure>
                        </div>

                    ))}
                </div>
       
        </div>

  

    )
}

export default Wano;