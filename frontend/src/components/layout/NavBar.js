import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import styles from "./NavBar.module.css";
import { Context } from "../../context/UserContext";
import api from "../../utils/api";
import RoundedImage from "../layout/RoundedImage";

function NavBar() {
  const { authenticated, logout } = useContext(Context);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token") || "";

  //get current user  
  useEffect(() => {
    const fetchUser = async () => {
      if (authenticated) {
        try {
          //api to consume current user route
          const response = await api.get("/users/currentUser", {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          //filling in the user to display your datas(ex: image etc)
          const data = response.data;
          setUser(data.message);
        } catch (err) {
          console.log("Erro ao buscar usuário", err);
          setUser({});
        }
      } else {
        // Limpa o estado do usuário quando o usuário faz logout
        setUser({});
      }
    };

    fetchUser();
  }, [authenticated, token]);

  useEffect(() => {
    if (!authenticated) {
      setUser({});
    }
  }, [authenticated]);

  return (
    <nav id={styles.navbar}>
      <Link to="/" id={styles.logo}>
        <img src={logo} alt="One Piece Community" />
      </Link>

      <ul>
        <li>
          <Link to="/">Pensamentos</Link>
        </li>
        <li><Link to = '/archs'>Arcos</Link></li>
        
        {/* show only users authenticated */}
        {authenticated ? (
          <>

            <li>
              <Link to="/users/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/users/edit">Meu perfil</Link>
            </li>

            {/* show user image */}
            {user.image && (
              <>
                <RoundedImage
                  width="px50" // Corrigido o valor da largura
                  src={`${process.env.REACT_APP_API}/images/users/${user.image}`} // Corrigido o uso de template literals
                  alt={user.name}
                />
                <span className={styles.userName}>{user.name}</span>
              </>
            )}
            
            <li className={`${styles.userProfile} user-profile`}></li>
          
            <li onClick={logout}>Sair</li>
          </>

        // user not authenticated
        ) : (
          <>
            <li>
              <Link to="/users/login">Entrar</Link>
            </li>
            <li>
              <Link to="/users/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
