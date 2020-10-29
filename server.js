import express from 'express';
import mongoose from 'mongoose';
import Cors  from  'cors';
import Cards from './dbCards.js';
//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url ="mongodb+srv://admins:V1WcydPgRgqdGCuv@cluster0.ngf6a.mongodb.net/tindersdb?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

//Api Endpoint
app.get("/",(req,res) => res.status(200).send("status"));
app.post('/tinder/cards',(req,res) => {
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});
app.get('/tinder/cards',(req,res) => {
    Cards.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })  
});


//Listner
app.listen(port,()=> console.log(`Your are in Port no ${port}`));