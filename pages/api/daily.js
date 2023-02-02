import nextConnect from 'next-connect';
import middleware from '../../lib/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('doctors')
    res.json(doc)
})

handler.post(async (req, res) => {
    let date = new Date()
    const id = JSON.parse(localStorage.getItem('id'))
    // let doc = await req.db.collection('doctors')
    res.json({ message: 'ok' });
})

export default handler;