'use strict';

const fetch = require('node-fetch');
const Util = require('../../lib/util');

async function fetchUrl(url) {
  return fetch(url)
            .then((response) => response.json()).then((jsonVal) => {
              const retVal = Object.assign({}, jsonVal, { url: url });
              return retVal;
            })
            .catch((err) => Promise.resolve(`${err}`));
}

/**
 * Util class which calls all the urls passed as array at once and resolve their output.
 * @param {*} urls : An array
 */
async function fetchUrls(urls) {
  if (!Util.isArray(urls)) {
    return Promise.reject('Invalid input, Expected an array');
  }
  return Promise.all(urls.map(url =>
    fetchUrl(url)
  ));
}

module.exports = {
  fetchUrl,
  fetchUrls
};
