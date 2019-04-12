'use strict';

const NodeCache = require('node-cache');
const RedisCacheService = require('./RedisCacheService');

/**
 * This class holds the Custom Cache
 * It has 2 levels of cache
 * 1: Node-Cache which is local
 * 2: Redis-Cache which is durable and distributed
 * The reason for 2 cache is for resilince. To serve the request fast we can
 * make use of local cache, and for making sure we dont hit the service often use redis cache for
 * failover.
 *
 * If there is a cache-miss on local as well as redis service will be called cache will be updated.
 *
 * Using this you can set 2 types of entries in cache,
 * 1: Permanent without expirty.
 *    This is a good suit for all countries, as countries name wont change as often its a good idea
 *    store this long term, if there is any change we can flush and update the cache.
 * 2: With expirty or specified TTL
 *    This is a good suit for daily numbers for population.
 *    TTL is calculated based on the time you request till 12:00 am next day.
 *    After that cache entry expires.
 */
class Cache {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
    if (process.env.REDIS_PORT && process.env.REDIS_HOST) {
      this.RedisCache = new RedisCacheService();
    }
  }

  async retrieveKey(key) {
    let retVal = this.cache.get(key);
    if (!retVal && this.RedisCache) {
      retVal = await this.RedisCache.retrieveKey(key);
      retVal = JSON.parse(retVal);
    }
    return retVal;
  }

  async setKey(key, value) {
    let retVal = this.cache.set(key, value);
    if (this.RedisCache) {
      try {
        retVal = await this.RedisCache.setKey(key, JSON.stringify(value));
      } catch (err) {
        console.log(err);
      }
    }
    return retVal;
  }

  async setKeyWithTTL(key, value, ttl) {
    let retVal = this.cache.set(key, value, ttl);
    if (this.RedisCache) {
      try {
        retVal = await this.RedisCache.setKeyWithExpiration(key, JSON.stringify(value), ttl);
      } catch (err) {
        console.log(err);
      }
    }
    return retVal;
  }

  delKey(keys) {
    this.cache.del(keys);
    if (this.RedisCache) {
      this.RedisCache.deleteKey(keys);
    }
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = new Cache(0);
