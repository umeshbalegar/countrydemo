const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();
const expectChai = require('chai').expect;


const populationController = require('../../../src/controllers/population/population.controller');
const populationHelper = require('../../../src/lib/population-helper');
const mockPopulation = require('../../fixtures/data/mock-population.json');

describe('population endpoint tests', () => {
  let sandbox;
  let todayDate;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    todayDate = `${yyyy}-${mm}-${dd}`;
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
          sandbox.stub(populationController, 'getPopulation').returns();
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
              expectChai(res.body).to.have.deep.property('[2].country', 'Albania');
              expectChai(res.body).to.have.deep.property('[2].total_population');
              expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
              expectChai(res.body).to.have.deep.property('[1].country', 'AFRICA');
              expectChai(res.body).to.have.deep.property('[1].total_population');
              expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
              expectChai(res.body).to.have.deep.property('[0].country', 'Afghanistan');
              expectChai(res.body).to.have.deep.property('[0].total_population');
              expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
              return done();
            });
        });

    it('should not affect the result if sort is not passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();
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
          expectChai(res.body).to.have.deep.property('[2].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'AFRICA');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[0].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
          return done();
        });
    });

    it('should not affect the result if wrong value is passed for sort',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();
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
          expectChai(res.body).to.have.deep.property('[2].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'AFRICA');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[0].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
          return done();
        });
    });

    it('should return ascending sorted population list when sort option asc is passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();
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
          expectChai(res.body).to.have.deep.property('[2].country', 'AFRICA');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[0].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
          return done();
        });
    });

    it('should return descending sorted population list when sort option desc is passed',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();

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
          expectChai(res.body).to.have.deep.property('[0].country', 'AFRICA');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[2].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
          return done();
        });
    });

    it('should return no value for total_population when, wrong country is sent',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();

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
          expectChai(res.body).to.have.deep.property('[0].country', 'AFRICAAAA');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.not.have.deep.property('[0].total_population.date');
          return done();
        });
    });

    it('should return wrong country value first when sorting in Ascending order,' +
        'as population is set to 0 by default',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();
      request(app)
        .post(`${endpointUrl}`)
        .send({ countries: [ 'Afghanistan', 'AFRICAAA', 'Albania'], sort: 'asc' })
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(3);
          expectChai(res.body).to.have.deep.property('[0].country', 'AFRICAAA');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.not.have.deep.property('[0].total_population.date');
          expectChai(res.body).to.have.deep.property('[2].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.have.deep.property('[2].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
          return done();
        });
    });

    it('should return wrong country value last when sorting in Descending order,' +
        'as population is set to 0 by default',
    function handlePostingForPopulationData(done) {
      sandbox.stub(populationController, 'getPopulation').returns();
      const compareVal = [];
      compareVal.push({ country: 'Afghanistan' });
      compareVal.push({ country: 'Albania' });
      compareVal.push({ country: 'AFRICAAA' });

      request(app)
        .post(`${endpointUrl}`)
        .send({ countries: [ 'Afghanistan', 'AFRICAAA', 'Albania'], sort: 'desc' })
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.length.should.be.eql(3);
          expectChai(res.body).to.have.deep.property('[2].country', 'AFRICAAA');
          expectChai(res.body).to.have.deep.property('[2].total_population');
          expectChai(res.body).to.not.have.deep.property('[2].total_population.date');
          expectChai(res.body).to.have.deep.property('[0].country', 'Afghanistan');
          expectChai(res.body).to.have.deep.property('[0].total_population');
          expectChai(res.body).to.have.deep.property('[0].total_population.date', todayDate);
          expectChai(res.body).to.have.deep.property('[1].country', 'Albania');
          expectChai(res.body).to.have.deep.property('[1].total_population');
          expectChai(res.body).to.have.deep.property('[1].total_population.date', todayDate);
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

    it('should return 500 if there is an error Getting population counts',
      function handleErrorGettingPopulation(done) {
        const error = new Error('fake error');
        sandbox.stub(populationHelper, 'getPopulationCounts').throws(error);

        request(app)
          .post(`${endpointUrl}`)
          .set('accept', 'application/json')
          .send({ countries: [ 'Afghanistan', 'AFRICAAA', 'Albania'], sort: 'desc' })
          .expect(500)
          .end(err => {
            if (err) {
              return done(err);
            }
            return done();
          });
      });

    it('should return 405 if we send a GET call instead of POST',
      function handleErrorGettingCountries(done) {
        const error = new Error('fake error');
        sandbox.stub(populationController, 'getPopulation').throws(error);

        request(app)
          .get(`${endpointUrl}`)
          .set('accept', 'application/json')
          .expect(405)
          .end(err => {
            if (err) {
              return done(err);
            }
            return done();
          });
      });
  });
});
