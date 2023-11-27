import express from 'express'
import cors from 'cors'
//routes
import userRoutes from '../routes/userRoutes';

const app = express();
const port = 5000
//definir trafego
app.use(express.json());

//Resolver problema do cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//define routes
app.use('/users', userRoutes);

//static files
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`app rodando na ${port}`);
})