import nextConnect from 'next-connect';
import middleware from '../../lib/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('projects')
    res.json(doc)
})


handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
    data.date = new Date(data.date);
    let doc = await req.db.collection('projects').insertOne({ name: data.name, description: data.description, image: data.imageUrl })
    res.json({ message: 'ok' });
})

export default handler;