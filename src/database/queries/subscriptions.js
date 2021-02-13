const connection = require('../connection');

export const getSubscriptions = async () => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `SELECT subscriptionId, name, firstBillingDate,
                    cycle, accountId, category, amount
                    FROM subscriptions`;
      result = await db.all(stmt, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    result = {
      error: 'Failed to retrieve all subscriptions',
    };
  }
  return result;
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

      const qRes = await db.run(stmt, params, (err) => {
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
    };
  }
  return result;
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

      await db.run(stmt, params, (err) => {
        if (err) {
          throw err;
        }
      });
      result = subscription;
    });
  } catch (err) {
    result = {
      error: 'Failed to edit the subscription',
    };
  }
  return result;
};

export const deleteSubscription = async (id) => {
  let result;
  try {
    await connection.query(async (db) => {
      const stmt = `DELETE FROM subscriptions WHERE subscriptionId = ?`;

      await db.run(stmt, [id], (err) => {
        if (err) {
          throw err;
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
    };
  }
  return result;
};

export const addMultipleSubscriptions = async (newSubscriptions) => {
  let result;
  try {
    const promises = [];
    for (let i = 0; i < newSubscriptions.length; i++) {
      const subscription = newSubscriptions[i];
      promises.push(addSubscription(subscription));
    }

    const addedSubscriptions = await Promise.all(promises);
    for (let j = 0; j < addedSubscriptions.length; j++) {
      if (addedSubscriptions[j].error) {
        throw new Error(addedSubscriptions[j].error);
      }
    }
    result = addedSubscriptions;
  } catch (err) {
    result = {
      error: 'Failed to create multiple subscriptions',
    };
  }
  return result;
};
