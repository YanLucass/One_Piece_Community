// Dashboard.js
import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Dashboard.module.css';
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate} from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [userThoughts, setUserThoughts] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();


  // get all users toughts to display in dashboard
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


  //delete tought by id
  async function deleteThought(id) {

    let msgText = 'Pensamento excluido com sucesso';
    let msgType = 'success'
      const response = await api.delete(`/toughts/delete/${id}`, {
         headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
         }
      })
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
         msgText = err.response.data.message;
         msgType = 'error';
      });

      setFlashMessage(msgText, msgType);
      
  }

  return (
    <>
    {/* Button to create tought */}
     <Link to='/toughts/create' className={styles.create}>Criar publicação</Link>

     {/* check if userThoughts  > 0 to display thoughts  */}
      {userThoughts.length > 0 ? (
        <div className={styles.container}>

          {/* show user name */}
          <h1>Sua dashboard {userThoughts.length > 0 ? userThoughts[0].user_name : ''}</h1>

          {/* cycle through a variety of thought objects to uniquely display */}
          {userThoughts.map((thought, index) => (
            <div className={styles.userThought} key={index}>
              <h3>{thought.title}</h3>
              <p>{thought.content}</p>
              <div className={styles.actions}>
                <Link to={`/toughts/edit/${thought.id}`}>Editar</Link>
                <Link to='/toughts/create'>Criar publicação</Link>
                {/* button to delete tought */}
                <button onClick={() => deleteThought(thought.id)}>Deletar</button>
              </div>
            </div>
          ))}
        </div>

        // case user not have toughts
      ) : (
        <p>
          Você ainda não tem publicações <Link to='/toughts/create'>Crie aqui</Link>
        </p>
      )}
    </>
  )
}

export default Dashboard;
