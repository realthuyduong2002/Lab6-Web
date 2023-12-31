import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Posts from './postModel.js';
import Pusher from 'pusher';

//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://thuyduong:Superjunior13@atlascluster.q9cmqbl.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
const pusher = new Pusher({
    appId: "1732323",
    key: "868653ce2c5a795eb119",
    secret: "7fd7482183773c56c6bd",
    cluster: "ap1",
    useTLS: true
});
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//API Endpoints
const db = mongoose.connection
mongoose.connection.once('open', () => {
    console.log('DB Connected')
    const changeStream = mongoose.connection.collection('posts').watch()
    changeStream.on('change', change => {
        console.log(change)
        if (change.operationType === "insert") {
            console.log('Trigerring Pusher')
            pusher.trigger('posts', 'inserted', {
                change: change
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/upload', (req, res) => {
    const dbPost = req.body
    Posts.create(dbPost)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})
app.get('/sync', (req, res) => {
    Posts.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))