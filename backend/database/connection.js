const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/**
 * @typedef {{host: string, port: number, name: string, username: string, password: string}} DatabaseInfo
 */

mongoose.set('useFindAndModify', false);

/**
 * Connects to the MongoDB backend database.
 * @return {Promise<Mongoose>}
 */
function connect() {
  const envUrl = getDatabaseURLFromEnv();
  if (envUrl) {
    return new Promise((resolve, reject) => {
      mongoose.connect(envUrl,
        {useNewUrlParser: true, useUnifiedTopology: true},
        err => err ? reject(err) : resolve(mongoose));
    });
  }
  return getDatabaseInfo()
    .then(databaseInfo => {
      return new Promise(((resolve, reject) => {
        const url = databaseInfo.username ?
          `mongodb://${databaseInfo.username}:${databaseInfo.password}@${databaseInfo.host}:${databaseInfo.port}/${databaseInfo.name}` :
          `mongodb://${databaseInfo.host}:${databaseInfo.port}/${databaseInfo.name}`;
        mongoose.connect(url,
          {useNewUrlParser: true, useUnifiedTopology: true},
          err => err ? reject(err) : resolve(mongoose));
      }));
    });
}

/**
 * Returns the underlying MongoDB object.
 * @return {Mongoose}
 */
function getMongoose() {
  return mongoose;
}

/**
 * Gets database information from environment or file.
 * @return {Promise<DatabaseInfo>}
 */
function getDatabaseInfo() {
  return new Promise((resolve, reject) => {
    const envInfo = getDatabaseInfoFromEnv();
    if (envInfo) {
      resolve(envInfo);
    } else {
      getDatabaseInfoFromFile()
        .then(fileInfo => resolve(fileInfo))
        .catch(reason => reject(new Error(`Unable to load database configuration : ${reason}`)));
    }
  });
}

/**
 * Gets database information from environment.
 * @return {DatabaseInfo}
 */
function getDatabaseInfoFromEnv() {
  return process.env.DATABASE_HOST ? {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  } : null;
}

/**
 * Gets database url from environment.
 * @return {string}
 */
function getDatabaseURLFromEnv() {
  return process.env.DATABASE_URL ? process.env.DATABASE_URL : null;
}

/**
 * Gets database information from preconfigured files.
 * @return {Promise<DatabaseInfo>}
 */
function getDatabaseInfoFromFile() {
  const baseFileName = 'dbinfo';
  const localFile = path.join(__dirname, `${baseFileName}.local.js`);
  const file = path.join(__dirname, `${baseFileName}.js`);
  return getInfoFromFile(localFile)
    .catch(_ => getInfoFromFile(file));
}

/**
 * Imports database information from a specific file.
 * @param {string} fileName The name of the file to require.
 * @return {Promise<DatabaseInfo>}
 */
function getInfoFromFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.access(fileName, fs.constants.R_OK, err => {
      if (err) {
        reject(new Error(`The file ${fileName} does not exist or is not readable`));
      } else {
        resolve(require(fileName));
      }
    });
  });
}

module.exports = {
  connect,
  getMongoose
};
