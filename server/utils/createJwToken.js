import jwt from "jsonwebtoken";

/**
 * creates a json web token
 * @param data
 * @returns {*}
 */
const createJwToken = data => {
    const { JSWT_SECRET } = process.env;

    return jwt.sign({ data }, JSWT_SECRET);
};

export default createJwToken;