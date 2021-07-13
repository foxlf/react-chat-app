const Pool = require('pg').Pool
const pool = new Pool({
    user: "fox",
    host: "localhost",
    database: "fox_db",
    password: "123",
    port: 5432
})



module.exports = pool
    // query: (text, params, callback) => {
    //   return pool.query(text, params, callback)
    // },