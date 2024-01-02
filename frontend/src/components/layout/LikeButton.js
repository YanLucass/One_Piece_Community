import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Context from "../../context/UserContext";
import styles from './LikeButton.module.css'
//images
import starIcon from '../../assets/img/start-filled.png';

function LikeButton({id}) {
    const navigate = useNavigate();
    const [ liked, setLiked ] = useState(false);
    const [ token ] = useState(localStorage.getItem('token'));
    const { authenticated } = useContext(Context);
    //view qtd like
    const [qtd] = useState();

    //check if the user has already liked
    useEffect(() => {
        const isLiked = localStorage.getItem(`liked_${id}`);
        if(isLiked !== null) {
            setLiked(JSON.parse(isLiked));
        }
    })

    //função para adcionar like
    async function addLike() {
        try {
            await api.patch(`/toughts/addLike/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });
            setLiked(true);

            //store like state 
            localStorage.setItem(`liked_${id}`, true);
        } catch(err) {
            console.log('Erro ao tentar adicionar like', err);
        }
        
    }

    //remove liek function
    async function removeLike() {
        try {
            await api.patch(`/toughts/removeLike/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            setLiked(false);
            localStorage.removeItem(`liked_${id}`); 
        }catch(err) {
            console.log('Erro ao remover like!', err);
        }   
    }


    async function handleClick() {

        if(!authenticated) {
            navigate('/users/login')
            return;
        }

        liked ? await removeLike() : await addLike();
      
    }       

    return (
            <button onClick={handleClick} className={`${styles.likeButton}`}>{liked ? (
                <img  src={starIcon} alt="Estrela curtida" width="20" height="20"/>

            ) : 'curtir'}</button>
        )
   
 }

export default LikeButton;