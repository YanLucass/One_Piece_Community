// Home.js

import api from "../../utils/api";
import { useState, useEffect } from "react";
import styles from './Home.module.css';
import RoundedImage from '../layout/RoundedImage'

function Home() {
  const [toughts, setToughts] = useState([]);

  useEffect(() => {
    api.get('/toughts/all')
      .then((response) => {
        setToughts(response.data.toughts);
      })
  }, []);

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
          
        </div>
      ))}
    </div>
  )
}

export default Home;
