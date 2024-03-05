// fix this
require('dotenv').config();
// ^^^^^^^^^
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;

const { MongoClient, ServerApiVersion } = require('mongodb');

// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // const docs = [
    //   {name: "Ethan Rinke", schoolClass: "Student", studentYear: "Senior", gradMonth: "May"};
    // ];
    
    const result = await client.db("papaLab").collection("papaCollection").find().toArray();
    return result;

    // display the results of your operation
    console.log(result);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
};
run().catch(console.dir);
//Read
app.get('/', async (req, res) => {
  let result = await run().catch(console.error); ; 

  console.log("run() Result: ", result);

  res.render('index', {
   
    pageTitle: "Students", 
    studentData: result

  });

});

// Create
app.get('/addGame', async (req, res)=> {
  
  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("papaLab").collection("vidGames");
    
    //draws from body parser 
    console.log(req.body);
    
    await collection.insertOne(req.body);
    res.redirect('/');
  }
  catch(err){
    console.log(err)
  }
  finally{
   // client.close()
  }
});


//Update
app.get('/updateGame', async (req, res) =>  {
  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("papaLab").collection("vidGames");
    let result = await collection.findOneAndUpdate( 
      {"_id": ObjectId(req.params.id)}, { $set: {"rYear": "2024" } }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }  
});

//Delete
app.post('/deleteGame/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("papaLab").collection("vidGames");
    let result = await collection.findOneAndDelete( 
      {
        "_id": ObjectId(req.params.id)
      }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

});


app.listen(port, () => {
  console.log(`papa app listening on port ${port}`)
}) 
