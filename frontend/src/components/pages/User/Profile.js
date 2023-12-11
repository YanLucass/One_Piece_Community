import api from "../../../utils/api";
import Input from "../../form/Input";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImage from "../../layout/RoundedImage";
import styles from '../../form/Form.module.css'



function Profile() {
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage(); 


    useEffect(() => {
        api.get('/users/currentUser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUser(response.data.message);
            
        })
        .catch(err => {
            console.log('Deu erro:', err);
        })

    }, [token]);

 

    function onChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function onFileChange(e) {
        setPreview(e.target.files[0]);
        setUser({...user, [e.target.name]: e.target.files[0]});
    }

    async function submit(e) {
        e.preventDefault();

        let msgText = 'Atualizado com sucesso!'
        let msgType = 'success'
        const formData = new FormData();

        await Object.keys(user).map((key) => {
            formData.append(key, user[key])
        })


        try {
            const response = await api.patch(`/users/edit/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            const data = response.data;
            setFlashMessage(msgText, msgType)
        }

        catch(err) {
            msgType = 'error'
            msgText = err.response.data.message
            setFlashMessage(msgText, msgType);
        }
       
    }

    return (
        
        <div className={styles.register_container}>
        <section> 
        <h1>Editar</h1>
        <section className={styles.img}>
        {(preview || user.image) && (
            preview ? 
            ( <RoundedImage
                src={URL.createObjectURL(preview)}
                alt={user.name}
            />
            ) 
             : 
            
            (
            <RoundedImage 
                src={`${process.env.REACT_APP_API}/images/users/${user.image}`} 
                alt={user.name}
           />
              
           )
        )}
        </section>
      
        <Input 
            text="Imagem:"
            type="file"
            name="image"
            handleOnChange={onFileChange}
            multiple={true}
        />
        <Input 
            type='text'
            text="Nome:"
            name="name"
            placeholder="Digite seu nome"
            value={user.name || ''}
            handleOnChange={onChange}
        />

        <Input 
            type='email'
            text="Email:"
            name="email"
            placeholder="Digite seu email"
            value={user.email || ''}
            handleOnChange={onChange}
        />

        <Input 
            type='password'
            text="Senha:"
            name="password"
            placeholder="Digite uma senha"
            handleOnChange={onChange}
        />
    
        <Input 
            type='password'
            text="Confirmação de senha:"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            handleOnChange={onChange}
        />

        <input type="submit" onClick={submit} className={styles.inputButton}></input>
    </section>
    </div>
    )
}

export default Profile;