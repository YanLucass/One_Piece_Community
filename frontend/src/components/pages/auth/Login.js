import { useContext, useState } from "react"
import Input from "../../form/Input"

import { Context } from "../../../context/UserContext"
import { Link } from "react-router-dom";

function Login() {

    const [user, setUser] = useState({});
    const {login} = useContext(Context);

    function onChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

   function submit(e) {
        e.preventDefault();
        login(user);
   }

    return (
        <div> 
            <h1>Login</h1>
            <Input 
                type="text"
                text="Email:"
                name="email"
                placeholder="Digite seu email"
                handleOnChange={onChange}
            />

            <Input 
                type="password"
                text="Senha:"
                name="password"
                placeholder="Digite sua senha"
                handleOnChange={onChange}
            />

            <input type="submit" onClick={submit}></input>
            <p>Já tem uma conta? <Link to='/users/register'>Clique aqui</Link> </p>
            
        </div>
    )
}


export default Login;