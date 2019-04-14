require('chai').should();
const expectChai = require('chai').expect;

const util = require('../../../src/lib/util');

function getSecondsToTomorrow() {
  let now = new Date();
  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}

describe('Util methods tests', () => {
  describe('util isArray function', function isArray() {
    it('Passing array should return true', function testisArray() {
      const obj = [];
      const testVal = util.isArray(obj);
      expectChai(testVal).to.be.true;
    });

    it('Passing object should return false', function testisArray() {
      const obj = {};
      const testVal = util.isArray(obj);
      expectChai(testVal).to.be.false;
    });

    it('Passing null should return false', function testisArray() {
      const obj = null;
      const testVal = util.isArray(obj);
      expectChai(testVal).to.be.false;
    });
  });

  describe('util getTodaysDate function', function getTodaysDate() {
    it('Testing the getTodaysDate function', function testgetTodaysDate() {
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
      const todayDate = `${yyyy}-${mm}-${dd}`;
      const testVal = util.getTodaysDate();
      expectChai(testVal).to.be.eql(todayDate);
    });
  });

  describe('util getTTL function', function getTTL() {
    it('Milliseconds till tomrrow 12:00 am check', function testgetTTL() {
      const testVal = util.getTTL() + 10;
      const actualVal = getSecondsToTomorrow();
      expectChai(testVal).to.be.greaterThan(actualVal);
    });
  });
});
