const request = require('supertest');
const app = require('../server');
const express = require('express');
const storeRouter = require('../routesFolder/store');
const vehiclesRouter = require('../routesFolder/vehicles');
const usersRouter = require('../routesFolder/users');
//const partsRouter = require('../routesFolder/parts')

// Mount the route handlers
app.use('/api/store', storeRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
//app.use('/api/parts',partsRouter);

describe('GET /api/stores', () => {
  it('responds with JSON containing a list of stores', (done) => {
    request(app)
      .get('/api/stores')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Assuming your response contains an array of stores
        const stores = res.body;
        expect(stores.length).to.be.greaterThan(0);
        // check if any stores
        // expect(stores[0]).to.have.property('name');
        done();
      });
  });
});

describe('GET /api/parts', () => {
  it('responds with JSON containing a list of parts', (done) => {
    request(app)
      .get('/api/parts')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Assuming your response contains an array of parts
        const parts = res.body;
        // expect(parts.length).to.be.greaterThan(0);
        expect(parts[0]).to.have.property('name');
        done();
      });
  });
});

describe('GET /api/users', () => {
  it('responds with JSON containing a list of users', (done) => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Assuming your response contains an array of users
        const users = res.body;
        // example:
        expect(users.length).to.be.greaterThan(0);
        expect(users[0]).to.have.property('username');
        done();
      });
  });
});

describe('GET /api/vehicles', () => {
  it('responds with JSON containing a list of vehicles', (done) => {
    request(app)
      .get('/api/vehicles')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Assuming your response contains an array of vehicles
        const vehicles = res.body;
        expect(vehicles.length).to.be.greaterThan(0);
        expect(vehicles[0]).to.have.property('make');
        done();
      });
  });
});













// store.test.js

const { createStore } = require('./store');

test('creates a new store', () => {
  const store = createStore('My Store');
  expect(store._id).toBeDefined();
  expect(store.name).toBe('My Store');
  expect(store.vehicle_inventory).toBe('vehicleid')
  expect(store.parts_inventory).toBe('partsid')

});
