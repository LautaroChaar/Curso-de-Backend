const express = require('express');
const app = express();
const path = require('path');

const {DB_PRODUCTS} = require('../../5/data/products-data');

app.use(express.static(__dirname + './public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('viewForm', {DB_PRODUCTS})
});

app.get('/products', (req, res) => {
    res.render('viewProducts', {DB_PRODUCTS})
});

app.post('/products', (req, res) => {
    DB_PRODUCTS.push(req.body);
    res.redirect('/');
});

const PORT = 9090;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchado en ${server.address().port}`)
});

server.on('error', err => console.log(`error en server ${err}`));