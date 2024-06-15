const app = require('express')();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'Latihan/Tugas 4/views')
app.use(bodyParser.urlencoded({extended: true}));

const users = []

app.get('/', (req, res, next) => {
    res.render('form', {title: 'Input User Form', users, path: '/'})
})

app.get('/users', (req, res, next) => {
    res.render('users', {title: 'User List', users, path: '/users'})
})

app.post('/users', (req, res, next) => {
    users.push(req.body.nama)
    res.redirect('/users')
})

app.listen(3001);