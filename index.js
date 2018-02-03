const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
      skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
      origin: CLIENT_ORIGIN
    })
);
app.use(jsonParser);

const cheesesDb =  [
  'Bath Blue',
  'Barkham Blue',
  'Buxton Blue',
  'Cheshire Blue',
  'Devon Blue',
  'Dorset Blue Vinney',
  'Dovedale',
  'Exmoor Blue',
  'Harbourne Blue',
  'Lanark Blue',
  'Lymeswold',
  'Oxford Blue',
  'Shropshire Blue',
  'Stichelton',
  'Stilton',
  'Blue Wensleydale',
  'Yorkshire Blue'
];

app.get('/api/cheeses', (req, res) => {
  return res.json(
   cheesesDb
  );
});

app.post('/api/cheeses', (req, res) =>{
  console.log(req.body.cheese);
  try{
    if(req.body.cheese) {
      cheesesDb.push(req.body.cheese);
      res.status(201).json(req.body.cheese);
    } else{
      res.status(400).end();
    }
  } catch (err){
    console.error(err);
  }
});

function runServer(port = PORT) {
  const server = app
        .listen(port, () => {
          console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
          console.error('Express failed to start');
          console.error(err);
        });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app};
