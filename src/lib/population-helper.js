'use strict';

const RequestHelper = require('../service/httpservice/RequestUtils');
const config = require('../config');
const Util = require('./util');
const LocalCache = require('../service/cacheservice/Cache');


function processData(response, baseUrl, date) {
  return response.map((result) => {
    let obj = {};
    obj.total_population = result.total_population ? result.total_population : {};
    obj.country = result.url.substring(baseUrl.length + 1, result.url.length - (date.length + 1));
    LocalCache.setKeyWithTTL(`${obj.country}-${date}`, obj, Util.getTTL());
    return obj;
  });
}

/**
 *
 * This is the population service helper method which takes the list of
 * countries requested by the request
 * and fetches the population for today.
 * If the sort value is sent it will be evaluated and sort the population based on that.
 * @param {*} countries : array
 * @param {*} sort : String (identifying values asc/ASC and desc/DESC)
 */
async function getPopulationCounts(countries, sort) {
  if (!Util.isArray(countries)) {
    return null;
  }

  // Build list of URLs for the country and todays date.
  let retVal = [];
  const baseUrl = `${config.populationservice.baseurl}/population/`;
  const date = Util.getTodaysDate();

  const urls = [];
  // eslint-disable-next-line no-plusplus
  for (let ind = 0; ind < countries.length; ind++) {
    const country = countries[ind];
    const val = await LocalCache.retrieveKey(`${country}-${date}`);
    if (!val) {
      urls.push(`${baseUrl}/${country}/${date}`);
    } else {
      retVal.push(val);
    }
  }

  // Do fetch of all the list.
  const response = await RequestHelper.fetchUrls(urls.filter((val) => val !== ''));

  // Map the result to our needs.
  const respResult = processData(response, baseUrl, date);

  respResult.forEach((item) => retVal.push(item));

  // Sort based on the params passed.
  if (sort && sort.toUpperCase() === 'ASC') {
    retVal.sort((obj1, obj2) => obj1.total_population.population -
                                obj2.total_population.population);
  } else if (sort && sort.toUpperCase() === 'DESC') {
    retVal.sort((obj1, obj2) => obj2.total_population.population -
                                obj1.total_population.population);
  }

  return retVal;
}

module.exports = {
  getPopulationCounts
};
