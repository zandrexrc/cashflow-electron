const connection = require('../connection');

const initialSettings = {
  currency: 'NOK',
  dateFormat: 'dd.MM.yyyy',
  appTheme: 'light',
  firstTimeUser: true,
};

export const getSettings = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT userSettings FROM settings`;
      const qRes = await db.get(stmt, (err) => {
        if (err) {
          throw err;
        }
      });
      const userSettings = qRes
        ? JSON.parse(qRes.userSettings)
        : initialSettings;
      result = userSettings;
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve settings',
    };
  }
  return result;
};

export const editSettings = async (newSettings) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `UPDATE settings SET userSettings = ? WHERE userId = ?`;
      const settingsString = JSON.stringify(newSettings);

      await db.run(stmt, [settingsString, 1], (err) => {
        if (err) {
          throw err;
        }
      });
      result = newSettings;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit settings',
    };
  }
  return result;
};
