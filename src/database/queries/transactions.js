const connection = require('../connection');

export const getTransactions = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT transactionId, date, description,
                    accountId, category, amount
                    FROM transactions`;
      result = await db.all(stmt, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all transactions',
    }
  } finally {
    return result;
  }
};

export const addTransaction = async (newTransaction) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `INSERT INTO transactions (date, description,
                    accountId, category, amount)
                    VALUES (?, ?, ?, ?, ?)`;
      const params = [
        newTransaction.date,
        newTransaction.description,
        newTransaction.accountId,
        newTransaction.category,
        newTransaction.amount,
      ];

      const qRes = await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = {
        transactionId: qRes.lastID,
        ...newTransaction,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to create a new transaction',
    }
  } finally {
    return result;
  }
};

export const editTransaction = async (transaction) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `UPDATE transactions
                    SET date = ?, description = ?,
                    accountId = ?, category = ?, amount = ?
                    WHERE transactionId = ?`;
      const params = [
        transaction.date,
        transaction.description,
        transaction.accountId,
        transaction.category,
        transaction.amount,
        transaction.transactionId,
      ];

      await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = transaction;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the transaction',
    }
  } finally {
    return result;
  }
};

export const deleteTransaction = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM transactions WHERE transactionId = ?`;

      await db.run(stmt, [id], function(err) {
        if (err) {
          throw (err);
        }
      });
      result = {
        transactionId: id,
        deleted: true,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to delete the transaction.',
    }
  } finally {
    return result;
  }
};

export const addMultipleTransactions = async (newTransaction) => {
  let result;
  try {
    await connection.query(async (db) => {
      const query = `INSERT INTO transactions (date, description,
                      accountId, category, amount)
                      VALUES (?, ?, ?, ?, ?)`;
      const stmt = await db.prepare(query);

      const addedTransactions = [];
      for (let i = 0; i < newTransaction.length; i++) {
        const transaction = newTransaction[i];
        const params = [
          transaction.date,
          transaction.description,
          transaction.accountId,
          transaction.category,
          transaction.amount,
        ];
        const qRes = await stmt.run(params, function(err) {
          if (err) {
            throw err;
          }
        });
        addedTransactions.push({
          transactionId: qRes.lastID,
          ...transaction,
        });
      }
      await stmt.finalize();
      result = addedTransactions;
    });
  } catch (err) {
    result = {
      error: 'Failed to create multiple transactions',
    }
  } finally {
    return result;
  }
};
