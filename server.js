const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const Parse = require('parse/node');

Parse.serverURL = 'https://lookafterapp.back4app.io';
Parse.initialize(
    'vYiSVg6tcTpEsYinWJXP5WzRQAETNsaE7QPFz8sT',
    'BdwOcGioi8wCzxH2htHBWDxODRZ4SjBDCw7D1sSD',
    'CIi6M8UyilFzcbwIoyhTG6TTF2p51lmg7wYvyRJp'
);

const infoDiapers = [
    {
        "url": "/assets/img/bg1.jpg",
        "size": "1024x683",
        "name": "BG1"
    },
    {
        "url": "/assets/img/bg2.jpg",
        "size": "1024x683",
        "name": "BG2"
    },
    {
        "url": "/assets/img/bg3.jpg",
        "size": "1024x683",
        "name": "BG3"
    },
    {
        "url": "/assets/img/bg4.jpg",
        "size": "1024x683",
        "name": "BG4"
    },
    {
        "url": "/assets/img/bg5.jpg",
        "size": "1024x683",
        "name": "BG5"
    },
    {
        "url": "/assets/img/bg6.jpg",
        "size": "1024x683",
        "name": "BG6"
    },
    {
        "url": "/assets/img/bg7.jpg",
        "size": "1024x683",
        "name": "BG7"
    },
    {
        "url": "/assets/img/bg8.jpg",
        "size": "1024x683",
        "name": "BG8"
    }
];

app.use(express.static(__dirname + '/dist/lookAfterApp'));
app.disable('etag');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('*', (req, res, next) => {
    res.sendFile(__dirname + '/dist/lookAfterApp/index.html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/home', (req, res) => {
    res.json(infoDiapers);
});

app.post('/home', (req, res, next) => {

    const User = Parse.Object.extend('User');
    const user = new User();

    user.set('fullName', req.body.fullName);
    user.set('username', req.body.fullName);
    user.set('email', req.body.email);
    user.set('phone', req.body.phone);
    user.set('password', req.body.password);

    user.save().then(
        (result) => {
            if (typeof document !== 'undefined') document.write(`ParseObject created: ${JSON.stringify(result)}`);
            console.log('ParseObject created', result);
            return res.send(result)
        },
        (error) => {
            if (typeof document !== 'undefined') document.write(`Error while creating ParseObject: ${JSON.stringify(error)}`);
            console.error('Error while creating ParseObject: ', error);
        }
    );
})



app.get('/user/:id', async (req, res) => {

    const id_username = req.params.id;
    const users = [];
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.equalTo('objectId', id_username);
    await query.find().then(
        (result) => {
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                const fullName = element.get('fullName');
                const date = element.get('createdAt');

                user = {
                    fullName: fullName,
                    date: date
                }
                users.push(user);
            }
        }
    );
    console.log(users);
    // res.writeHead(304);
    // res.write(users);
    // res.json('mandou!!!')
});

app.listen(PORT, () => {
    console.log('Server online...')
});