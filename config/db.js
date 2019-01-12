const { Pool, Client } = require('pg');
    var setting = {
        uri: 'postgres://kburuxiudhihbo:0c26fc6d1a06365a5a8fe206452e3ff9fb2e12fc76531080ab1342c1dbba21c4@ec2-54-243-238-46.compute-1.amazonaws.com:5432/db2kj54elqvc21',
      }
      const pool = new Pool({
        connectionString: setting.uri,
        ssl: true
      })
// var pool = new Pool(databaseConfig)
module.exports = pool;