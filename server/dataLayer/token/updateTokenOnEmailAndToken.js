import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({ token, email }) =>
    `UPDATE token SET ? WHERE token="${token}"
     AND email="${email}" AND createdBy="${email} "
     AND expires<=CURRENT_TIMESTAMP AND deletedFlag=0
     `;

/**
 * updates a message using messageRef to identify.
 * @param token
 * @param email
 * @param data
 * @returns {Promise}
 */
const updateTokenOnEmailAndToken = ({token, email, data}) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                const queryData = {
                    lastUpdatedBy: email,
                    lastUpdatedAt: null,
                    ...data
                };
               
                connection.query(
                    query({ token, email }),
                    queryData,
                    (error, results, fields) => {
                        connection.release();

                        if (!error) {
                            const { affectedRows } = results;

                            if (affectedRows > 0) {
                                resolve(
                                    handleSuccess(`token updated`, {
                                        results,
                                        fields
                                    },
                                        "DATA - UPDATE_TOKEN_ON_EMAIL_AND_TOKEN"
                                    )
                                );
                            } else {
                                reject(handleError("DATA - UPDATE_TOKEN_ON_EMAIL_AND_TOKEN token not found", error));
                            }
                        } else {
                            reject(handleError(
                                "DATA - UPDATE_TOKEN_ON_EMAIL_AND_TOKEN query could not be completed",
                                error
                            ))
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - UPDATE_TOKEN_ON_EMAIL_AND_TOKEN could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default updateTokenOnEmailAndToken;
