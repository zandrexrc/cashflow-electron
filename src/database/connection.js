const path = require('path');

const { app } = require('electron');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'src', 'database')
  : path.join(__dirname);

const connection = {
  async openDb(filename) {
    return open({
      filename,
      driver: sqlite3.Database,
    });
  },

  async query(callback) {
    const dbPath = path.join(RESOURCES_PATH, 'cashflow.db');
    const db = await this.openDb(dbPath);

    try {
      await callback(db);
    } finally {
      db.close();
    }
  },
};

module.exports = connection;
