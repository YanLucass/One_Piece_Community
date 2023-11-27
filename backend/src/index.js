import express from 'express'
import cors from 'cors'
//routes
import userRoutes from '../routes/userRoutes';

const app = express();
const port = process.env.PORT || 5000;
//definir trafego
app.use(express.json());

//Resolver problema do cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//define routes
app.use('/users', userRoutes);



app.listen(port, () => {
    console.log('Aplicação rodando');
})