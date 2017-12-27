import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({ messageRef, userRef }) =>
    `UPDATE message SET ? WHERE messageRef='${messageRef}' AND createdBy=${userRef} AND deletedFlag='0'`;

/**
 * updates a message using messageRef to identify.
 * @param messageRef
 * @param userRef
 * @param data
 * @returns {Promise}
 */
const updateMessageOnMessageRef = ({ messageRef, userRef, data }) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                const queryData = {
                    lastUpdatedBy: userRef,
                    lastUpdatedAt: null,
                    ...data
                };

                connection.query(
                    query({ messageRef, userRef }),
                    queryData,
                    (error, results, fields) => {
                        connection.release();

                        if (!error) {
                            const { affectedRows } = results;

                            if (affectedRows > 0) {
                                resolve(
                                    handleSuccess(`message updated`, {
                                        results,
                                        fields
                                    },
                                        "DATA - UPDATE_MESSAGE_ON_MESSAGE_REF"
                                    )
                                );
                            } else {
                                reject(handleError("DATA - UPDATE_MESSAGE_ON_MESSAGE_REF message not found", error));
                            }
                        } else {
                            handleError(
                                handleError(
                                    "DATA - UPDATE_MESSAGE_ON_MESSAGE_REF query could not be completed",
                                    error
                                )
                            );
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - UPDATE_MESSAGE_ON_MESSAGE_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default updateMessageOnMessageRef;
