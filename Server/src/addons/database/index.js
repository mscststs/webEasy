import mysql from "mysql2"

// Create the connection pool. The pool-specific settings are the defaults
let pool = null

export default async function getDB(ctx) {
    if(pool){
        return pool
    }else{
        let _pool = await mysql.createPool({
            ...ctx.config.db,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        pool = _pool.promise();
        return pool
    }
}
