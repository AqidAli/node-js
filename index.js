
const express = require('express');
const app = express()

const { dbConnection } = require('./connection');
const { ObjectId } = require('mongodb');
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const port = 3000



app.get('/', (req, res) => {
   return res.json({
    'message': 'Welcome'
   })
});


app.get('/student',  async (req, res) => {
    const db = await dbConnection();
    
    const userCollection =  db.collection("student");
    const studentData = await userCollection.find({}).toArray();
    
    return res.json({message:'All student', data: studentData, status: 'OK'}).status(200)
})


app.delete('/student/delete/:id', async (req, res) => {
    try {
        const db = await dbConnection();
        const userId = req.params.id;

        const userCollection = db.collection("student"); // select user collection 
        const deleteResult = await userCollection.deleteOne({ _id: new ObjectId(userId) });
 

        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({
                message: `Record with ID ${userId} deleted successfully.`,
                data: userId,
                status: "OK"
            });
        } else {
            return res.status(404).json({
                message: `No record found with ID ${userId}.`,
                data: userId,
                status: "NOT_FOUND"
            });
        }
    } catch (err) {
        console.error('Error deleting record:', err);
        return res.status(500).json({
            message: 'Error deleting record',
            error: err.message,
            status: "ERROR"
        });
    }
});


app.post('/student',  async (req, res) => {
    const db = await dbConnection();

    let name = req.body.name
    let role = req.body.role
    let hobby = req.body.hobby ? req.body.hobby : "None";
    
    const userCollection = await db.collection("student"); // select the user collection (table)
    const studentsData = await userCollection.insertOne({
        name: name,
        role: role,
        hobby: hobby
    });
    
    return res.json({message:'Student Created', data:[], status: 'OK'}).status(200)
})






app.get('/teachers',  async (req, res) => {
    const db = await dbConnection();
    
    const userCollection = await db.collection("teachers"); // select the user collection (table)
    const teachersData = await userCollection.find({}).toArray();
    
    return res.json({message:'All teachers', data:teachersData, status: 'OK'}).status(200)
})




app.listen(port, () => console.log('server is running on port 3000'))
