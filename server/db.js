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
          error = 'test'
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

const sql = `CREATE TABLE IF NOT EXISTS test (
   id INT NOT NULL,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL,
   register_date DATE,
   PRIMARY KEY (id)
)`
async function test() {
  const res = await poolQuery(sql)
  console.log(res)
}

test().catch((e) => {
  console.log(e)
})


module.exports = { query: db.query, poolQuery }