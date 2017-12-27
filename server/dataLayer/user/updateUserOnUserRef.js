import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";
import createTimestamp from "../../utils/createTimestamp";

const timestamp = createTimestamp();

const query = userRef =>
    `UPDATE user SET ? WHERE userRef='${userRef}' AND deletedFlag='0'`;

/**
 * updates a user using userRef to identify.
 * @param userRef
 * @param data
 * @returns {Promise}
 */
const updateUserOnUserRef = ({ userRef, data }) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                const queryData = {
                    lastUpdatedBy: userRef,
                    lastUpdatedAt: null,
                    ...data
                };

                connection.query(
                    query(userRef),
                    queryData,
                    (error, results, fields) => {
                        connection.release();

                        if (!error) {
                            const { affectedRows } = results;

                            if (affectedRows > 0) {
                                resolve(
                                    handleSuccess(`user updated`, {
                                        results,
                                        fields
                                    },
                                        "DATA - GET_USER_ON_EMAIL"
                                    )
                                );
                            } else {
                                reject(handleError("DATA - GET_USER_ON_EMAIL user not found", error));
                            }
                        } else {
                            handleError(
                                handleError(
                                    "DATA - GET_USER_ON_EMAIL update user by userRef query could not be completed",
                                    error
                                )
                            );
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - GET_USER_ON_EMAIL could not connect to database to update user by userRef",
                        error
                    )
                );
            }
        });
    });
};

export default updateUserOnUserRef;
