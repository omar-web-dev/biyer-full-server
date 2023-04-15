const { MongoClient, ServerApiVersion } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
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