

const pool = require('../config/db');
exports.load = (sql) => {
    return new Promise((resolve, reject)=>{
        pool.connect().then(client =>{
            client.query(sql,function(err, result){
                if(err) reject(err);
                else resolve(result);
                client.release()
            })
        })
    })
   
}