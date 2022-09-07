const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

const { DB_PRODUCTS } = require('../../5/data/products-data');

app.use(express.static(__dirname + './public'));
app.use(express.urlencoded({extended: true}));

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}))
app.set('views', './views');
app.set('view engine', 'hbs');

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
})

server.on('error', err => console.log(`error en server ${err}`))