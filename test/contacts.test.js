require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const Contact = require('../lib/models/Contact');
const mongoose = require('mongoose');

describe('contact routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a contact', () => {
    return request(app)
      .post('/api/v1/contacts')
      .send({
        fullname: 'Danny Suarez',
        phone: 5039893177,
        address: '154 S. Knott St Canby, OR 97013'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          fullname: 'Danny Suarez',
          phone: 5039893177,
          address: '154 S. Knott St Canby, OR 97013',
        });
      });
  });

  it('can get all contacts', async() => {
    const data = [
      {
        fullname: 'Danny Suarez',
        phone: 5039893177,
        address: '154 S. Knott St Canby, OR 97013'
      },
      {
        fullname: 'Vasily Suarez',
        phone: 5039893177,
        address: '154 S. Knott St Canby, OR 97013'
      },
      {
        fullname: 'John Suarez',
        phone: 5039893177,
        address: '154 S. Knott St Canby, OR 97013'
      }
    ];

    
    await Contact
      .create(data);

    return request(app)
      .get('/api/v1/contacts/all')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.any(String),
            fullname: expect.any(String),
            phone: 5039893177,
            address: '154 S. Knott St Canby, OR 97013',
          },
          {
            _id: expect.any(String),
            fullname: expect.any(String),
            phone: 5039893177,
            address: '154 S. Knott St Canby, OR 97013',
          },
          {
            _id: expect.any(String),
            fullname: expect.any(String),
            phone: 5039893177,
            address: '154 S. Knott St Canby, OR 97013',
          }
        ]);
      });

  });

  it('can get contact by ID', async() => {
    const contact = JSON.parse(JSON.stringify(
      await Contact
        .create({
          fullname: 'Vasily Suarez',
          phone: 5039893177,
          address: '154 S. Knott St Canby, OR 97013'
        })
    ));
    return request(app)
      .get(`/api/v1/contacts/${contact._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          fullname: 'Vasily Suarez',
          phone: 5039893177,
          address: '154 S. Knott St Canby, OR 97013'
        });
      });
  });

});
