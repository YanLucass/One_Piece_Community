
import Input from "../../form/Input";
import { useContext, useState } from "react";
import styles from '../../form/Form.module.css'
// Components
import RoundedImage from "../../layout/RoundedImage";
//context
import { Context } from "../../../context/UserContext";
import imgCadastro from '../../../assets/img/imgCadastro.png'

function Register() {
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState(); // para upload de imagem
    //função para registrar
    const { registerUser } = useContext(Context);

    //mudança dos inputs
    function onChange(e) {
        setUser({...user, [e.target.name]: e.target.value});    
       
    }

    //mudança de arquivos no input
    function onFileChange(e) {
        //adicionar a primeira foto ao preview
        setPreview(e.target.files[0]);
        //incluir campo image ao user
        setUser({...user, [e.target.name]: e.target.files[0]});
       
    }
    function submit(e) {
        e.preventDefault();
        //chamar register.
        console.log(user);
        registerUser(user);
    }

    return (
            <div className={styles.register_container}>
            <section> 
            <h1>Registro</h1>
            <section className={styles.img}>
            {(preview) && (
               <RoundedImage 
                    src={URL.createObjectURL(preview)} 
                    alt={user.name}
               />
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
                handleOnChange={onChange}
            />

            <Input 
                type='email'
                text="Email:"
                name="email"
                placeholder="Digite seu email"
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


export default Register;