const path = require('path')

const express = require('express');

const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRoutes);
app.use(homeRoutes);

app.listen(3001);