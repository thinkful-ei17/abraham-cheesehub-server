const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Cheese} = require('./model');
const router = express.Router();

router.use(jsonParser);
mongoose.Promise = global.Promise;

router.get('/cheeses', (req, res) => {
  Cheese.find()
  .then(cheeses => {
    res.json(cheeses);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  });
});

router.post('/cheeses', (req, res) => {
  if(!req.body.name){
    res.status(400).json({message: 'Missing required field: name'});
  }

  Cheese.create(req.body.name)
    .then(cheese => {
      if(cheese){
        res.location(`${res.originalUrl}/${cheese.id}`).status(201).json(cheese);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({message: 'Internal Server Error'});
    });
});