import dbConfig from './database.config';
import cacheConfig from './cache.config';

export default () => ({
  port: process.env.PORT,
  api_prefix: process.env.API_PREFIX,
  database: dbConfig,
  cache: cacheConfig,
});
