const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 678;
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());

//mongodb code 

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khetibazaar-db.x4hyd2s.mongodb.net/?retryWrites=true&w=majority&appName=khetibazaar-db`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    //database and collections
    const menuCollection = client.db("khetibazaar_DB").collection("menus");
    const cartCollection = client.db("khetibazaar_DB").collection("cartItems");

    //all meanu items 
    app.get('/menu', async(req, res) =>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    })

    //cart items operations
    //posting to db
    app.post("/carts", async(req, res) => {
      const cartItem = req.body
      const result = await cartCollection.insertOne(cartItem)
      res.send(result)
      refetch();
    })

    //get carts data using email
    app.get("/carts", async(req,res) => {
      const email = req.query.email;
      const filter = { email : email};
      const result = await cartCollection.find(filter).toArray();
      res.send(result)
    })

    //getting specific carts items
    app.get('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollection.findOne(filter);
      res.send(result)
    }) 

    //delete items from carts 
    app.delete('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(filter);
      res.send(result)
    })

    // update cart quantities 
    app.put("/carts/:id", async(req, res) =>{
    const id = req.params.id;
    const {quantity} = req.body
    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        quantity: parseInt(quantity,10)
      },
    };

    const result = await cartCollection.updateOne(filter, updateDoc, options);

    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Developers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})