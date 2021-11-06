const mysql = require('mysql')

module.exports = {
    mysqlConfig : {
        host : 'localhost',
        port : '3306',
        user: 'root',
        password: 'root',
        database:'blogdb'
    },

    sqlConnect : (sql,sqlArray,callBack) =>{
        let pool = mysql.createPool({host : 'localhost',
        port : '3306',
        user: 'root',
        password: 'root',
        database:'blogdb'})
        pool.getConnection((err,conn)=>{
            if(err){
                console.log("connect error");
                return; 
            }

            conn.query(sql,sqlArray,callBack)

            conn.release()
        })
    }
}