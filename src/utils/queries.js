import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});
/**
 * method to create table
 * @param {*} query query to create table
 * @param {*} tableName name of table
 */
export const createTable = async (query, tableName) => {
  await db.transaction(runquery => {
    runquery.executeSql(
      query,
      [],
      () => {
        console.log(`${tableName} table created`);
      },
      ej => {
        console.log(ej);
      },
    );
  });
};

/**
 * method to select data from db
 * @param {*} selectQuery query
 * @returns data
 */
export const selectData = async (selectQuery, method) => {
  const data = [];
  await db.transaction(tx => {
    tx.executeSql(selectQuery, [], (tx, results) => {
      const len = results.rows.length;
      if (len > 0) {
        console.log('length of data:', len);
        for (let i = 0; i < len; i++) {
          data.push(results.rows.item(i));
        }
      }
    });
  });
  method(data);
};

/**
 * method to insert data
 * @param {*} insertQuery query to insert data
 */
export const insertData = async (insertQuery, message) => {
  const inserted = false;
  await db.transaction(runquery => {
    runquery.executeSql(
      insertQuery,
      [],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('data inserted, rowsAffected:', results.rowsAffected);
          message && Toast.show(message, Toast.SHORT);
          inserted = true;
        } else {
          console.log('not inserted');
          inserted = false;
        }
      },
      ej => {
        console.log(ej);
      },
    );
  });
  return inserted;
};

export const editData = (updateQuery, values) => {
  db.transaction(tx => {
    tx.executeSql(updateQuery, values, (tx, results) => {
      console.log('Results', results.rowsAffected);
      if (results.rowsAffected > 0) {
        Toast.show(message, Toast.SHORT);
        return true;
      } else return false;
    });
  });
};

export const deleteRecord = async (deleteQuery, message) => {
  const deleted = false;
  await db.transaction(tx => {
    tx.executeSql(deleteQuery, [], (tx, results) => {
      console.log('Row Effected', results.rowsAffected);
      if (results.rowsAffected > 0) {
        deleted = true;
      } else deleted = false;
    });
  });
  return deleted;
};
