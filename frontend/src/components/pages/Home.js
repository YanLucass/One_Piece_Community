// Home.js

import api from "../../utils/api";
import { useState, useEffect } from "react";
import styles from './Home.module.css';
import RoundedImage from '../layout/RoundedImage'
import { Link } from "react-router-dom";

function Home() {
  const [toughts, setToughts] = useState([]);
  const [user, setUser] = useState({});
  let [token] = useState(localStorage.getItem('token') || '');

  async function getUserId() {
    const response = await api.get('/users/currentUser', {
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

  }
  
  if(token) {
    getUserId()
  }

  useEffect(() => {
    api.get('/toughts/all')
      .then((response) => {
        setToughts(response.data.toughts);
      })
  }, []);

console.log(user);
console.log(toughts);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      {toughts.map((tought, index) => (
        
        <div className={styles.tought} key={index}>
            <RoundedImage 
                width='px45'
                src={`${process.env.REACT_APP_API}/images/users/${tought.user_image}`}
            />
            <span className={styles.bold}>{tought.user_name}</span> 
          <h2>{tought.title}</h2>
          <p>{tought.content}</p>

          {/* so para os usuarios donos */}
          {tought.user_id === user.id && (
            <p> <Link to={`/toughts/edit/${tought.id}`}>Editar</Link></p>
          )}
          
          
        </div>
      ))}
    </div>
  )
}

export default Home;
