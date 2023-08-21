const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let latestSubmission = { name: '', message: '' };

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required fields.' });
    }

    latestSubmission = { name, message };
    res.json({ name, message });
});

app.get('/latest-submission', (req, res) => {
    res.json(latestSubmission);
});

app.get('/', (req, res) => {
    const indexPath = path.join("public", 'index.html');
    fs.readFile(indexPath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading the page.');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
