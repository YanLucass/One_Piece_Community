// Home.js
import api from "../../utils/api";
import { useState, useEffect } from "react";
import styles from './Home.module.css';
import RoundedImage from '../layout/RoundedImage'
import { Link } from "react-router-dom";
// format date
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'  
dayjs.extend(localizedFormat)

function Home() {
  const [toughts, setToughts] = useState([]);
  const [user, setUser] = useState({});
  let [token] = useState(localStorage.getItem('token') || '');

 //get the current user to display "edit link in their thoughts"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users/currentUser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        const data = response.data.message;
        setUser(data);

      }
      catch(err) {
        console.error('Erro ao buscar os dados do usuário:', err);
      }
    }
    fetchData();
  }, [token])
  
  //get all thoughts to display on home
  useEffect(() => {
    api.get('/toughts/all')
      .then((response) => {
        setToughts(response.data.toughts);
      })
  }, []);



  return (
    <div className={styles.container}>
      <h1>Home</h1>

      {/* display  every thought */}
      {toughts.map((tought, index) => (
        
        
        <div className={styles.tought} key={index}>
          

          {/* display each user photo */}
            <RoundedImage 
                width='px45'
                src={`${process.env.REACT_APP_API}/images/users/${tought.user_image}`}
            />
           <span className={styles.bold}>{tought.user_name}</span> 
               {/* formart and display timestamp in Brazilian formart */}

          <span className={styles.bold}>
            {dayjs(tought.created_at).format('DD/MM/YYYY')}
          </span> 
              
          <h2>{tought.title}</h2>
          <p>{tought.content}</p>

          {/* display edit link  for thought owner users */}
          {tought.user_id === user.id && (
            <p> <Link to={`/toughts/edit/${tought.id}`}>Editar</Link></p>
          )}
          
        </div>
      ))}
    </div>
  )
}

export default Home;
