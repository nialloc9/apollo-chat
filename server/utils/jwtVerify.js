import jwt from "jsonwebtoken";
import log from "./log";
import { __INVALID_TOKEN__ } from '../constants/token';

const jwtVerify = (jwToken) => {
    const envSecret = process.env.JSWT_SECRET;

    if (!jwToken) {
        log({ level: 'error', title: "__JWT_ERROR__", message: "token missing" });
        throw new Error(__INVALID_TOKEN__);
    }

    try {
        jwt.verify(jwToken, envSecret);
    } catch (err) {
        log({ level: 'error', title: "__JWT_ERROR__", message: "invalid token" });
        throw new Error(__INVALID_TOKEN__);
    }
};

export default jwtVerify;