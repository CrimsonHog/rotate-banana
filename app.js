const express = require('express');
const app = express();
const port = process.env.port || 5500;

let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let myTypeServer = "The Eradictor";

app.get('/', function(req,res){
    res.render('index', {
        
    });
});

app.get('/', function(req,res){

    res.send('Hello world from express')
});

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
}); 