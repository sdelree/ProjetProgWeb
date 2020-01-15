const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/**
 * @typedef {{host: string, port: number, name: string}} DatabaseInfo
 */

/**
 * Connects to the MongoDB backend database.
 * @return {Promise<Mongoose>}
 */
function connect() {
  return getDatabaseInfo()
    .then(databaseInfo => {
      return new Promise(((resolve, reject) => {
        mongoose.connect(`mongodb://${databaseInfo.host}:${databaseInfo.port}/${databaseInfo.name}`,
          {useNewUrlParser: true, useUnifiedTopology: true},
          (err) => err ? reject(err) : resolve(mongoose));
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
    if(envInfo) {
      resolve(envInfo);
    } else {
      getDatabaseInfoFromFile()
        .then(fileInfo => resolve(fileInfo))
        .catch(reason => reject(`Unable to load database configuration : ${reason}`));
    }
  });
}

/**
 * Gets database information from environment.
 * @return {DatabaseInfo}
 */
function getDatabaseInfoFromEnv() {
  return process.env.DATABASE_INFO ? JSON.parse(process.env.DATABASE_INFO) : null;
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
        reject(`The file ${fileName} does not exist or is not readable`);
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
