const connection = require('../connection');

export const getAccounts = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT accountId, name, type, balance
                        FROM accounts`;
      result = await db.all(stmt, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all accounts',
    };
  }
  return result;
};

export const addAccount = async (newAccount) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `INSERT INTO accounts (name, type, balance)
                      VALUES (?, ?, ?)`;
      const params = [newAccount.name, newAccount.type, newAccount.balance];

      const qRes = await db.run(stmt, params, (err) => {
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
    };
  }
  return result;
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

      await db.run(stmt, params, (err) => {
        if (err) {
          throw err;
        }
      });
      result = account;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the account',
    };
  }
  return result;
};

export const deleteAccount = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM accounts WHERE accountId = ?`;

      await db.run(stmt, [id], (err) => {
        if (err) {
          throw err;
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
    };
  }
  return result;
};

export const addMultipleAccounts = async (newAccounts) => {
  let result;
  try {
    const promises = [];
    for (let i = 0; i < newAccounts.length; i++) {
      const account = newAccounts[i];
      promises.push(addAccount(account));
    }

    const addedAccounts = await Promise.all(promises);
    for (let j = 0; j < addedAccounts.length; j++) {
      if (addedAccounts[j].error) {
        throw new Error(addedAccounts[j].error);
      }
    }
    result = addedAccounts;
  } catch (err) {
    result = {
      error: 'Failed to create multiple accounts',
    };
  }
  return result;
};
