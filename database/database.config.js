const { MongoClient, ServerApiVersion } = require('mongodb');
// const connectionString = process.env.ATLAS_URI;
const connectionString = `mongodb+srv://<biyer-full>:<AWuFoJs2GI26Wjrn>@cluster0.vbwbv4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

let dbConnection;
module.exports = {
    connectToServer: (cb) => {
        client.connect((err, db) => {
            if (err || !db) {
                return cb(err)
            }
            dbConnection = db.db('database-name');
            console.log('successfullty connected to mongodb');
            return cb()
        })
    },
    getDB: () => dbConnection
}