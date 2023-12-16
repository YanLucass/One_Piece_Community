import api from "../../utils/api";
import { useState, useEffect } from "react";
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import RoundedImage from '../layout/RoundedImage'
import Input from '../form/Input';
import Comment from "./Toughts/Commnet";

// format date
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'  
dayjs.extend(localizedFormat)


//HOME

function Home() {
  const [toughts, setToughts] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // search toughts input
  const [searchTerm, setSearchTerm] = useState('');

  //tought id from comment component
  const [selectedToughtId, setSelectedToughtId] = useState(null);

  //tyo display comments from toughts publications
  const [allComments, setAllComments] = useState([]);


  let [token] = useState(localStorage.getItem('token') || '');

 //get the current user to display "edit link/delete in their thoughts"
  useEffect(() => {
    const fetchData = async () => {
      try {

        //api to consume current user route
        const response = await api.get('/users/currentUser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        //insert data in user
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


    //get all comments
    async function getAllComments(toughtId) {
      
      try {
        const response = await api.get(`/comment/getAll/${toughtId}`);
        const data = response.data.comments;
        setAllComments(data);
       
       }
       catch(err) {
        console.error('Erro ao buscar os comentários', err);
      }
    }

  // delete tought by id function
  async function deleteThought(id) {

    let msgText = 'Pensamento excluido com sucesso';
    let msgType = 'success'
      const response = await api.delete(`/toughts/delete/${id}`, {
         headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
         }
      })
      .then(() => {
         
        const updateToughts = toughts.filter(tought => tought.id !== id);
        setToughts(updateToughts);
        navigate('/');
      })
      .catch((err) => {
         msgText = err.response.data.message;
         msgType = 'error';
      });

      
  }

  //to change in input search
  function onSearchChange(e) {
      setSearchTerm(e.target.value);
  }

  //quando clicar em "comentar" em uma publicação vamos pegar o id dela
  const handleThoughtClick = (toughtId) => {
      setSelectedToughtId(toughtId);
  }


  
  
  //use effect to show all comments form toughts


  //filter based on the returning term, creating a new array for terms that meet the condition
 const filteredToughts = toughts.filter(tought => {
  return (
    tought.trim === '' || 
    //by title
    (tought.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    //by content
    (tought.content?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    //by author
    (tought.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  )
});


  console.log(filteredToughts);
  return (

    <div className={styles.container}>

    <div> 
        <input className={styles.searchInput}
        type='text'
        placeholder='Pesquise por título, conteúdo, autor'
        value={searchTerm}
        onChange={onSearchChange}
    />
    </div>
    
      <h1>Home</h1>
      {/* display  every thought using the array filteredToughts*/}
      {filteredToughts.map((tought, index) => (
        
        
        <div className={styles.tought} key={index}>
        
          {/* display each user photo */}
            <RoundedImage 
                width='px45'
                src={`${process.env.REACT_APP_API}/images/users/${tought.user_image}`}
            />
           <span className={styles.bold}>{tought.user_name}</span> 
               {/* formart and display timestamp in Brazilian formart */}

          <span className={styles.date}>
            {dayjs(tought.created_at).format('DD/MM/YYYY/ HH:mm')}
          </span> 
              
          <h2>{tought.title}</h2>
          <p>{tought.content}</p>

            {/* quando clicar quero que apaça ese compoenente */}
            <button onClick={() => handleThoughtClick(tought.id)}>Adicionar comentário</button>
            {selectedToughtId === tought.id && <Comment id={tought.id} />}  

                   {/* show comments */}
                   {allComments.length > 0 ? 
                        allComments.filter(comment => comment.tought_id === tought.id)
                        .map((comment, index) => (
                            <div key={index}> 
                              {/* show details from comment */}
                              
                              <p>{comment.content}</p>
                              
                            </div>
                        
                        ))  : ''}
            

                  
                
            <button onClick={() => getAllComments(tought.id)}>Ver comentários</button>

     

          {/* display edit link  for thought owner users */}
          {tought.user_id === user.id && (
            <>
             <p> <Link to={`/toughts/edit/${tought.id}`}>Editar</Link></p>
                <button onClick={() => deleteThought(tought.id)}>Deletar</button>
  
            
            </>
           
          )}
          
        </div>
      ))}
    </div>
  )
}

export default Home;