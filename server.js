const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;


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

app.get('/*', (req, res, next) => {
    res.sendFile(__dirname + '/dist/lookAfterApp/index.html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/home', (req, res) => {
    res.json(infoDiapers);
});

app.listen(PORT, () => {
    console.log('Server online...')
});