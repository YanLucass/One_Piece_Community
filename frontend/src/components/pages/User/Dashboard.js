// Dashboard.js

import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Dashboard.module.css';

function Dashboard() {
  const [userThoughts, setUserThoughts] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/toughts/userToughts', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setUserThoughts(response.data.message);
    })
  }, [token])

  function deleteThought() {
    console.log('oi');
  }

  return (
    <>
     <Link to='/toughts/create' className={styles.create}>Criar publicação</Link>
      {userThoughts.length > 0 ? (
        <div className={styles.container}>
          <h1>Sua dashboard {userThoughts.length > 0 ? userThoughts[0].user_name : ''}</h1>

          {userThoughts.map((thought, index) => (
            <div className={styles.userThought} key={index}>
              <h3>{thought.title}</h3>
              <p>{thought.content}</p>
              <div className={styles.actions}>
                <Link to={`/toughts/edit/${thought.id}`}>Editar</Link>
                <Link to='/toughts/create'>Criar publicação</Link>
                <button onClick={deleteThought}>Deletar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
          Você ainda não tem publicações <Link to='/toughts/create'>Crie aqui</Link>
        </p>
      )}
    </>
  )
}

export default Dashboard;
