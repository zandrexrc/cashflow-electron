const connection = require('../connection');

export const getTransactions = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT transactionId, date, description,
                    accountId, category, amount
                    FROM transactions`;
      result = await db.all(stmt, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all transactions',
    };
  }
  return result;
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

      const qRes = await db.run(stmt, params, (err) => {
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
    };
  }
  return result;
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

      await db.run(stmt, params, (err) => {
        if (err) {
          throw err;
        }
      });
      result = transaction;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the transaction',
    };
  }
  return result;
};

export const deleteTransaction = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM transactions WHERE transactionId = ?`;

      await db.run(stmt, [id], (err) => {
        if (err) {
          throw err;
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
    };
  }
  return result;
};

export const addMultipleTransactions = async (newTransactions) => {
  let result;
  try {
    const promises = [];
    for (let i = 0; i < newTransactions.length; i++) {
      const transaction = newTransactions[i];
      promises.push(addTransaction(transaction));
    }

    const addedTransactions = await Promise.all(promises);
    for (let j = 0; j < addedTransactions.length; j++) {
      if (addedTransactions[j].error) {
        throw new Error(addedTransactions[j].error);
      }
    }
    result = addedTransactions;
  } catch (err) {
    result = {
      error: 'Failed to create multiple transactions',
    };
  }
  return result;
};
