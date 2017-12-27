import cluster from "cluster";
import os from "os";
import http from "http";
import Socket from "socket.io";
import { app } from "./config";
import log from "./utils/log";
import open from "./apiMiddleware/open";
import brain from "./apiMiddleware/brain";

const { WEB_CONCURRENCY, SERVER_PORT, PORT } = process.env;

/**
 * is the cluster master? Yes? Set up workers. If not set up server.
 */
if (!cluster.isMaster) {
    // don't do this: https://devcenter.heroku.com/articles/node-memory-use
    // const numWorkers = os.cpus().length;

    const numWorkers = WEB_CONCURRENCY || os.cpus().length;

    log({
        title: "SERVER",
        level: "special",
        message: `Master cluster setting up ${numWorkers} workers...`
    });

    //fork cluster n times
    for (let i = 0; i < numWorkers; i++) {
        const worker = cluster.fork();
    }

    //when a new fork is made
    cluster.on("online", worker => {
        log({
            title: "SERVER - Master",
            level: "special",
            message: `Worker ${worker.process.pid} is online...`
        });
    });

    //when a fork ends
    cluster.on("exit", (oldWorker, code, signal) => {
        log({
            title: "SERVER - Master",
            level: "special",
            message: `Worker ${oldWorker.process.pid} died with code: ${
                code
            }, and signal: ${signal}`
        });

        const newWorker = cluster.fork();

        log({
            title: "SERVER - Master",
            level: "special",
            message: `Starting a new worker with id of ${newWorker.process.pid}`
        });

        //listen for messages from worker
        newWorker.on("message", message => {
            log({
                title: "SERVER - Master",
                level: "special",
                message: `Message from worker: ${message}`
            });
        });
    });
} else {
    const server = http.Server(app);
    const io = new Socket(server);

    // Create an http listener for our express app.
    server.listen(PORT, () => {
        log({
            title: "SERVER",
            level: "special",
            message: `process ${process.pid} listening on port ${
                SERVER_PORT
            }, Press Ctrl-C to stop.`
        });
    });

    io.of("/api/open").on("connection", open);

    io.of("/api/brain").on("connection", brain);

    // Listen for messages from master
    process.on("message", message => {
        const { type } = message;

        if (type === "shutdown") {
            process.exit(0);
        }
    });
}
