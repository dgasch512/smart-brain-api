const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const port = process.env.PORT || 3000;
const app = express();

app.set('db', db);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=> {res.send('it is working')});
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req,res) => { image.handleImage(req, res, db)});


app.listen(port, () => {
  console.log(`App running on port: ${port}`)
});