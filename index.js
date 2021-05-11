const express = require('express');


const home = require('./routes/home');
const app = express()

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/',home);
app.use('/index',home);
app.use(express.static('public'));

const port = 3000
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))