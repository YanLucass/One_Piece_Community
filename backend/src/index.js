import express from 'express'
import cors from 'cors'
//routes
import userRoutes from '../routes/userRoutes';
import toughtsRoutes from '../routes/toughtsRoutes';
import archsRoutes from '../routes/archsRoutes'
import commentRoutes from '../routes/commentRoutes';

const app = express();
const port = 5000;
//definir trafego

app.use(express.json());

//Resolver problema do cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//define routes
app.use('/users', userRoutes);
app.use('/toughts', toughtsRoutes);
app.use('/archs', archsRoutes);
app.use('/comment', commentRoutes);

//static files
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`app rodando na ${port}`);
})