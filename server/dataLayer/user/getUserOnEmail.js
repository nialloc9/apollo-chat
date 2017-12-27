import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = email => `
SELECT * from user where email ='${email}' AND deletedFlag='0'`;

/**
 * gets user data from user table including the profile and cover image source from file table.
 * @param {string} email
 * @returns {Promise}
 */
const getUserOnEmail = email => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(email), (error, results, fields) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("user found", results[0], "DATA - GET_USER_ON_EMAIL")
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_USER_ON_EMAIL email does not exist", { email })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_USER_ON_EMAIL get user on email query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_USER_ON_EMAIL could not connect to database to get user on email",
                        error
                    )
                );
            }
        });
    });
};

export default getUserOnEmail;
