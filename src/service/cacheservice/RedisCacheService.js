'use strict';

const Redis = require('ioredis');

/**
 * Class which connects to Redis and make all the transactions.
 */
class RedisCacheService {
  constructor() {
    if (process.env.REDIS_PORT && process.env.REDIS_HOST) {
      console.log(`${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
      this.client = new Redis({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
      });
    }
  }

  getCacheClient() {
    return this.client;
  }

  retrieveKey(key) {
    return this.client.get(key);
  }

  setKey(key, value) {
    return this.client.set(key, value);
  }

  deleteKey(key) {
    return this.client.del(key);
  }

  async setKeyWithExpiration(key, value, expiration) {
    return Promise.resolve(await this.client.set(key, value, 'ex', expiration));
  }

  quitCacheClient() {
    return this.client.quit();
  }
}

module.exports = RedisCacheService;
