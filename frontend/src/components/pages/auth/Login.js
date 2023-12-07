import { useState } from "react"
import Input from "../../form/Input"

import { Context } from "../../../context/UserContext"


function Login() {

    const [user, setUser] = useState({});
    //importar login

    function onChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    console.log(user);

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
        </div>
    )
}


export default Login;