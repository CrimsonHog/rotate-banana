const express = require('express');
const app = express();
const port = process.env.port || 5500;

app.set('view engine', 'ejs');


app.get('/', function(req,res){
    res.render('views/index');
});

app.get('/', function(req,res){

    res.send('Hello world from express')
});

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
}); 