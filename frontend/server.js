const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/feature'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/feature/'}),
);

app.listen(process.env.PORT || 8080);