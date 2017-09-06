const mysql = require('mysql')
let db = null
const config = {
  host     : 'localhost',
  user     : 'root',
  password : 'tangjinzhou',
  database : 'yidian_crm',
  multipleStatements: true,
}
const pool = mysql.createPool(config);

function handleError (err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

const poolQuery = (sqlString, values, callback) => {
  let cb = callback, vals = []
  if(typeof values === 'function') {
    cb = values
  } else {
    vals = values
  }
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err,conn){
      if(err){
        handleError(err);
      }else{
        conn.query(sqlString, vals, (error, results, fields) => {
          conn.release(); // 释放连接
          cb && cb(error, results, fields);
          if(error) {
            reject(error)
          } else {
            resolve({results, fields})
          }
        });
        conn.on('error', handleError);
      }
    });
  })
  
  return res;
}

function connect () {
  db = mysql.createConnection(config);
  db.connect(handleError);
  db.on('error', handleError);
}
connect()

const sql = `CREATE TABLE IF NOT EXISTS accounts_info (
  id INT NOT NULL AUTO_INCREMENT,
  account_id INT NOT NULL,
  account_name VARCHAR(40) NOT NULL,
  account_email VARCHAR(40),
  deleted BOOL DEFAULT false,
  add_date DATE,
  PRIMARY KEY (id),
  INDEX (account_id, account_name, account_email)
)`
async function test() {
  const res = await poolQuery(sql)
}

test().catch((e) => {
  console.error(e)
})


module.exports = { query: db.query, poolQuery }