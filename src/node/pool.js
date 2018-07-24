/*
*连接池模块——因为Node中的模块都是“单例”的，多次require不会创建多个！
 */

const mysql = require('mysql');

let pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "shopcart",
    port:3306,
    connectionLimit: 10
});
console.log('数据库连接池创建完成');

module.exports = pool;