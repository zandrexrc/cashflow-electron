const path = require('path');

const {open} = require('sqlite');
const sqlite3 = require('sqlite3');

const connection = {

  async openDb(filename) {
    return open({
      filename,
      driver: sqlite3.Database,
    });
  },

  async query(callback) {
    const dbPath = path.resolve(__dirname, 'cashflow.db');
    const db = await this.openDb(dbPath);

    try {
      await callback(db);
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  },

};

module.exports = connection;
