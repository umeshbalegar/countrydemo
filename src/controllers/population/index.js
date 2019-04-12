'use strict';

const controller = require('./population.controller');

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
    * @apiVersion 1.0.0
    * @api {post} /population
    * @apiGroup Population
    * @apiName Get list of population for the countries provided
    * @apiDescription Returns an array of Population counts for each country requested.
    *
    * @apiSampleRequest /api/v1/population
    *
    * @apiSuccess {json} Array of all country with population of that day
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     {
    *       "total_population": {
    *         "date" : "2019-04-10",
    *         "population" : 132323
    *       },
    *       "country" : "United States"
    *     },
    *     {
    *       "total_population": {
    *         "date" : "2019-04-10",
    *         "population" : 13223323
    *       },
    *       "country" : "Inida"
    *     }
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.post(`${fullRootUrl}/population`, controller.getPopulation);
}

module.exports = {
  routes: routes
};
