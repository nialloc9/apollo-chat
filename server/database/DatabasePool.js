import myql from "mysql";
import log from '../utils/log';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const DatabasePool = myql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

DatabasePool.on("enqueue", () => {
    log({
        title: 'DATABASE',
        level: "info",
        message: "Waiting for available connection slot"
    });
});

DatabasePool.on("release", connection => {
    log({
        title: 'DATABASE',
        level: "info",
        message: `Connection ${connection.threadId} released`
    });
});

export default DatabasePool;
