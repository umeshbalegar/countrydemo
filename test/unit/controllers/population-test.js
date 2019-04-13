const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const populationController = require('../../../src/controllers/population/population.controller');
const mockPopulation = require('../../fixtures/data/mock-population.json');

describe('population endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('Post to get population', function getPopulation() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/population';
    const postBody = { countries: [ 'Afghanistan', 'AFRICA', 'Albania'] };
    const postBodySortAsc = { countries: [ 'Afghanistan', 'AFRICA', 'Albania'], sort: 'asc' };
    const postBodySortDesc = { countries: [ 'Afghanistan', 'AFRICA', 'Albania'], sort: 'desc' };
    it('should return a list of population for all countries passed',
        function handlePostingForPopulationData(done) {
          sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
          request(app)
            .post(`${endpointUrl}`)
            .send(postBody)
            .set('accept', 'application/json')
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.array;
              res.body.length.should.be.eql(postBody.countries.length);
              res.body.should.eql(mockPopulation);
              return done();
            });
        });

    it('should not affect the result if sort is not passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      request(app)
        .post(`${endpointUrl}`)
        .send(postBody)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(postBody.countries.length);
          res.body.should.eql(mockPopulation);
          return done();
        });
    });

    it('should return ascending sorted population list when sort option asc is passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      mockPopulation.sort((obj1, obj2) => obj1.total_population.population -
                                          obj2.total_population.population);
      request(app)
        .post(`${endpointUrl}`)
        .send(postBodySortAsc)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(postBodySortAsc.countries.length);
          res.body.should.eql(mockPopulation);
          return done();
        });
    });

    it('should return descending sorted population list when sort option desc is passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      mockPopulation.sort((obj1, obj2) => obj2.total_population.population -
                                          obj1.total_population.population);
      request(app)
        .post(`${endpointUrl}`)
        .send(postBodySortDesc)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(postBodySortDesc.countries.length);
          res.body.should.eql(mockPopulation);
          return done();
        });
    });

    it('should return no value for total_population when, wrong country is sent',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      const retVal = [{ total_population: {}, country: 'AFRICAAAA' }];
      request(app)
        .post(`${endpointUrl}`)
        .send({ countries: ['AFRICAAAA'] })
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(1);
          res.body.should.eql(retVal);
          return done();
        });
    });

    it('should return 400 error if countries attribute is not sent as part of body',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      request(app)
        .post(`${endpointUrl}`)
        .send({})
        .set('accept', 'application/json')
        .expect(400)
        .end(done);
    });

    it('should return 400 error if nothing is sent as part of body',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns(mockPopulation);
      request(app)
        .post(`${endpointUrl}`)
        .send()
        .set('accept', 'application/json')
        .expect(400)
        .end(done);
    });
  });
});
