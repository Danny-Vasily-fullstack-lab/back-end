const { Router } = require('express');
const Contact = require('../models/Contact');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      fullname,
      phone,
      address
    } = req.body;

    Contact
      .create({ fullname, phone, address })
      .then(contact => res.send(contact))
      .catch(next);
  
  })

  .get('/all', (req, res, next) => {
    Contact
      .find()
      .then(contacts => res.send(contacts))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Contact
      .findById(req.params.id)
      .then(contact => res.send(contact))
      .catch(next);
  });

