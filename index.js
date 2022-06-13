const express = require('express')
const app = express()

const cors=require('cors')

const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient;


const URL = 'mongodb+srv://raja16:raja16@cluster0.smsr1.mongodb.net/?retryWrites=true&w=majority'

// app.use(
//     cors({
//         origin: "https://rjcollection.netlify.app/"
//     })
// );

app.use(express.static("" + "/public"));

app.use(express.json());




app.get('/catalog', async (req, res) => {

    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("catalog")
        let catalog = await db.collection("menswear").find().toArray()
        await connection.close();
        res.json(catalog)

    } catch (error) {
        res.json(error)
        console.log(error)
    }
    
})


app.get('/catalog/:id([0-9a-fA-F]{24})',  async (req, res) => {
    try{
        let connection = await mongoclient.connect(URL);
        let db = connection.db("catalog");
        let catalog = await db.collection("menswear").findOne({ _id : mongodb.ObjectId(req.params.id) });
        await connection.close();
        res.json(catalog);
    } catch (error) {
        console.log(error)
    }
});

    
app.post('/catalog', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("catalog")       
        await db.collection("menswear").insertOne(req.body)
        await connection.close();
        res.json(catalog)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})


app.get('/contact', async (req, res) => {

    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("catalog")
        let catalog = await db.collection("contact").find().toArray()
        await connection.close();
        res.json(catalog)

    } catch (error) {
        res.json(error)
        console.log(error)
    }

})


app.post('/contact', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("catalog")
        await db.collection("contact").insertOne(req.body)
        await connection.close();
        res.json()
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})
    
   





app.listen(process.env.PORT || 3001);