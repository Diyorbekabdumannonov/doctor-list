import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://Diyorbek:diyorbek1987@cluster0.tkvlqv4.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    await client.connect();
    req.dbClient = client;
    req.db = client.db('Portfolio');
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;