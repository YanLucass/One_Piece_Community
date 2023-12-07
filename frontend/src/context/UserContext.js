import { createContext } from "react";
import useAuth from "../hooks/useAuth";


//provedor do contexto, vai prover as funções do useAuth para todos componentes
export const Context = createContext();

export function UserProvider({ children }) {
    const { authenticated, registerUser, login } = useAuth();

    return (
        <Context.Provider value={{ authenticated, registerUser, login}}>
            {children}
        </Context.Provider>
    );
}
