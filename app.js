const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const DB_USER = "biyer-full"
const DB_PASSWORD = "AWuFoJs2GI26Wjrn"
const IMGBB_API = "6a56f720ef5af169c2b3789d5fb3086f"

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vbwbv4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        const userCallection = client.db('biyer-ful').collection('users')
        await client.connect();

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCallection.insertOne(user);
            console.log(result)
            res.send(result);
        });


        app.get('/users', async (req, res) => {
            const query = {};
            const users = await userCallection.find(query).toArray();
            res.send(users);
        });


        //find user email

        app.get('/users/:email', async (req, res) => {
            const userEmail = req.params.email;
            const user = await userCallection.findOne({email : userEmail} );
            console.log(userEmail)
            console.log(user)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        });

        // find user by id
        // app.get('/users/:id', async (req, res) => {
        //     const userId = req.params.id;
        //     const user = await userCallection.findOne({_id : new ObjectId(userId)} );
        //     console.log(userId)
        //     console.log(user)
        //     if (!user) {
        //         return res.status(404).json({ message: 'User not found' });
        //     }
        //     res.json(user);
        // });

        console.log("Connected to Database");
    } finally {
    }
};

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Biyer-full");
});
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));