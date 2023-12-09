import api from "../../utils/api";
import { useState, useEffect } from "react";
import styles from './Home.module.css'

function Home() {

    const [toughts, setToughts] = useState([]);

    useEffect(() => {
        api.get('/toughts/all')
        .then((response) => {
            setToughts(response.data.toughts);
            console.log(setToughts);
        })
    }, [])

    return (
        <div>
            <h1> Homee</h1>
       
            {toughts.map((tought, index) => (
                <div key={index}>
                    <h2>{tought.title}</h2>
                    <p>{tought.content}</p>
                    <span className="bold">por: {tought.user_name}</span>
                </div>
            ) )}
        </div>
    )
}

export default Home;