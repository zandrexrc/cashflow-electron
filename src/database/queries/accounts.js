const connection = require('../connection');

export const getAccounts = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT accountId, name, type, balance
                        FROM accounts`;
      result = await db.all(stmt, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all accounts',
    }
  } finally {
    return result;
  }
};

export const addAccount = async (newAccount) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `INSERT INTO accounts (name, type, balance)
                      VALUES (?, ?, ?)`;
      const params = [
        newAccount.name,
        newAccount.type,
        newAccount.balance,
      ];

      const qRes = await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = {
        accountId: qRes.lastID,
        ...newAccount,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to create a new account',
    }
  } finally {
    return result;
  }
};

export const editAccount = async (account) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `UPDATE accounts
                    SET name = ?, type = ?, balance = ?
                    WHERE accountID = ?`;
      const params = [
        account.name,
        account.type,
        account.balance,
        account.accountId,
      ];

      await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = account;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the account',
    }
  } finally {
    return result;
  }
};

export const deleteAccount = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM accounts WHERE accountId = ?`;

      await db.run(stmt, [id], function(err) {
        if (err) {
          throw (err);
        }
      });
      result = {
        accountId: id,
        deleted: true,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to delete the account.',
    }
  } finally {
    return result;
  }
};

export const addMultipleAccounts = async (newAccounts) => {
  let result;
  try {
    await connection.query(async (db) => {
      const query = `INSERT INTO accounts (name, type, balance)
                      VALUES (?, ?, ?)`;
      const stmt = await db.prepare(query);

      const addedAccounts = [];
      for (let i = 0; i < newAccounts.length; i++) {
        const account = newAccounts[i];
        const params = [
          account.name,
          account.type,
          account.balance,
        ];
        const qRes = await stmt.run(params, function(err) {
          if (err) {
            throw err;
          }
        });
        addedAccounts.push({
          accountId: qRes.lastID,
          ...account,
        });
      }
      await stmt.finalize();
      result = addedAccounts;
    });
  } catch (err) {
    result = {
      error: 'Failed to create multiple accounts',
    }
  } finally {
    return result;
  }
};
