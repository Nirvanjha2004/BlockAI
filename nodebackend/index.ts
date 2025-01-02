import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/ai', aiRouter);
app.use('/contract'. contractRouter);


const PORT = 3000; 
app.listen(PORT, ()=>"Port is listening")