import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../lib/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const updatedDoc = await req.db.collection('doctors').updateOne(
        { "_id": ObjectId(req.headers._id) },
        { $set: { "booked": req.headers.time } },
    )
    let doc = await req.db.collection('doctors').find({}).toArray()
    res.json(JSON.parse(JSON.stringify(req.headers._id)))
})

export default handler;