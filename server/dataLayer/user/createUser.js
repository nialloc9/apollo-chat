import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";
import createTimestamp from "../../utils/createTimestamp";
import hashPassword from "../../utils/hashPassword";
import avatars from "./avatars";


const timestamp = createTimestamp();

const query = "INSERT INTO user SET ?";

/**
 * creates a new user in the database
 * @param email
 * @param password
 * @returns {*|Promise}
 */
const createUser = ({ email, password }) => {

    const hashedPassword = hashPassword(password);
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    const data = {
        email,
        password: hashedPassword,
        avatar
    };

    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query, data, (error, results, fields) => {
                    connection.release();
                    if (!error) {
                        resolve(
                            handleSuccess("user created", {
                                email,
                                password: hashedPassword,
                                createdAt: timestamp,
                                lastUpdatedAt: timestamp,
                                createdBy: 'CREATE_USER',
                                lastUpdatedBy: 'CREATE_USER',
                                userRef: results.insertId
                            },
                            "DATA - CREATE_USER"
                            )
                        );
                    } else {
                        reject(
                            handleError(
                                "DATA - CREATE_USER query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - CREATE_USER could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default createUser;
