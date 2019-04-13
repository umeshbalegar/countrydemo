'use strict';

const Redis = require('ioredis');
const Config = require('../../config');

/**
 * Class which connects to Redis and make all the transactions.
 */
class RedisCacheService {
  constructor() {
    if (process.env.REDIS_PORT && process.env.REDIS_HOST) {
      console.log(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
      this.client = new Redis({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        maxRetriesPerRequest: Config.redis.maxRetriesPerRequest,
        connectTimeout: Config.redis.connectionTimeout,
        enableOfflineQueue: false,
        reconnectOnError: (() => false),
        retryStrategy: ((times) => {
          if (times === 1) {
            return Math.min(times * 50, 2000);
          }
          return false;
        })
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
