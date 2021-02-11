const connection = require('../connection');

export const getSubscriptions = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT subscriptionId, name, firstBillingDate,
                    cycle, accountId, category, amount
                    FROM subscriptions`;
      result = await db.all(stmt, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all subscriptions',
    }
  } finally {
    return result;
  }
};

export const addSubscription = async (newSubscription) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `INSERT INTO subscriptions (name, firstBillingDate,
                    cycle, accountId, category, amount)
                    VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        newSubscription.name,
        newSubscription.firstBillingDate,
        newSubscription.cycle,
        newSubscription.accountId,
        newSubscription.category,
        newSubscription.amount,
      ];

      const qRes = await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = {
        subscriptionId: qRes.lastID,
        ...newSubscription,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to create a new subscription',
    }
  } finally {
    return result;
  }
};

export const editSubscription = async (subscription) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `UPDATE subscriptions
                    SET name = ?, firstBillingDate = ?, cycle = ?,
                    accountId = ?, category = ?, amount = ?
                    WHERE subscriptionId = ?`;
      const params = [
        subscription.name,
        subscription.firstBillingDate,
        subscription.cycle,
        subscription.accountId,
        subscription.category,
        subscription.amount,
        subscription.subscriptionId,
      ];

      await db.run(stmt, params, function(err) {
        if (err) {
          throw err;
        }
      });
      result = subscription;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the subscription',
    }
  } finally {
    return result;
  }
};

export const deleteSubscription = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM subscriptions WHERE subscriptionId = ?`;

      await db.run(stmt, [id], function(err) {
        if (err) {
          throw (err);
        }
      });
      result = {
        subscriptionId: id,
        deleted: true,
      };
    });
  } catch (err) {
    result = {
      error: 'Failed to delete the subscription.',
    }
  } finally {
    return result;
  }
};

export const addMultipleSubscriptions = async (newSubscription) => {
  let result;
  try {
    await connection.query(async (db) => {
      const query = `INSERT INTO subscriptions (name, firstBillingDate,
                      cycle, accountId, category, amount)
                      VALUES (?, ?, ?, ?, ?, ?)`;
      const stmt = await db.prepare(query);

      const addedSubscriptions = [];
      for (let i = 0; i < newSubscription.length; i++) {
        const subscription = newSubscription[i];
        const params = [
          subscription.name,
          subscription.firstBillingDate,
          subscription.cycle,
          subscription.accountId,
          subscription.category,
          subscription.amount,
        ];
        const qRes = await stmt.run(params, function(err) {
          if (err) {
            throw err;
          }
        });
        addedSubscriptions.push({
          subscriptionId: qRes.lastID,
          ...subscription,
        });
      }
      await stmt.finalize();
      result = addedSubscriptions;
    });
  } catch (err) {
    result = {
      error: 'Failed to create multiple subscriptions',
    }
  } finally {
    return result;
  }
};
