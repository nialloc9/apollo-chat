import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = userRef => `
SELECT * from user where userRef ='${userRef}' AND deletedFlag='0'`;

/**
 * gets user data from user table using the uerRef.
 * @param {string} userRef
 * @returns {Promise}
 */
const getUserOnUserRef = userRef => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(userRef), (error, results, fields) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("user found", results[0], "DATA - GET_USER_ON_EMAIL")
                            );
                        } else {
                            reject(
                                handleError(`DATA - GET_USER_ON_EMAIL user does not exist on userRef: ${userRef}`, { userRef })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_USER_ON_EMAIL get user on userRef query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_USER_ON_EMAIL could not connect to database to get user on userRef",
                        error
                    )
                );
            }
        });
    });
};

export default getUserOnUserRef;
