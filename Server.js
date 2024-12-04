
const express = require('express');
const app = express()


app.use(express.json())
// app.use(express.urlencoded({ extended: false}))
const port = 3000

const { MongoClient } = require('mongodb');

const dburl = 'mongodb://localhost:27017';
const database = 'School'
const database1 = 'School'

const studentTable = 'student'
const teachersTable = 'teachers'

const client = new MongoClient(dburl);
    
async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();


        const db = client.db(database);
        const collections = await db.listCollections().toArray(); // show all tables(collection)

        const studentCollection = await db.collection(studentTable); // select a collection(users, products etc)
        const studentData = await studentCollection.find().toArray();
        
        console.log('Table selected', studentData);

 
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        await client.close();
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
   return res.json({
    'message': 'Welcome'
   })
});


app.get('/api/student', async (req, res) => {

    await client.connect();
    const db = client.db(database);


    const studentCollection = await db.collection(studentTable); // select the user collection (table)
    const studentData = await studentCollection.find({}).toArray();
    
     
    return res.json({message:'All Student', data:studentData, status: 'OK'}).status(200)
})



app.get('/api/teachers', async (req, res) => {

    await client.connect();
    const db = client.db(database);


    const userCollection = await db.collection(teachersTable); // select the user collection (table)
    const teachersData = await userCollection.find({}).toArray();
    
     
    return res.json({message:'All Teachers', data:teachersData, status: 'OK'}).status(200)
})




app.listen(port, () => console.log('server is running on port 8000'))
