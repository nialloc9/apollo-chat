import express from "express";
import middleware from "./middleware";

const { SERVER_ADDRESS } = process.env;
const app = express();

// middleware
app.use(...middleware);

// Don't expose any software information to potential hackers.
app.disable("x-powered-by");

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", SERVER_ADDRESS);

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "POST");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Pass to next layer of middleware
    next();
});

export { app };
