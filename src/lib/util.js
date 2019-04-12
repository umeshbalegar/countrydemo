'use strict';

function isArray(obj) {
  return (!!obj) && (obj.constructor === Array);
}

function getTodaysDate() {
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
  return `${yyyy}-${mm}-${dd}`;
}

function getTTL() {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const t1 = new Date(today.getFullYear(), today.getMonth() + 1,
                      today.getDate(),
                      today.getHours(),
                      today.getMinutes(),
                      today.getSeconds(),
                      0);
  const t2 = new Date(tomorrow.getFullYear(),
                      tomorrow.getMonth() + 1,
                      tomorrow.getDate(), 0, 0, 0, 0);

  const dif = t1.getTime() - t2.getTime();

  return Math.abs(dif / 1000);
}

module.exports = {
  isArray,
  getTodaysDate,
  getTTL
};
