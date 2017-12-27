import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = "INSERT INTO message SET ?";

/**
 * creates a new message in the database
 * @param roomRef
 * @param userRef
 * @param message
 * @returns {*|Promise}
 */
const createMessage = ({ roomRef, userRef, message }) => {

    const data = {
        roomRef,
        message,
        createdBy: userRef,
        lastUpdatedBy: userRef
    };

    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query, data, (error, results) => {
                    connection.release();
                    if (!error) {
                        resolve(
                            handleSuccess("message created", {
                                ...data,
                                deletedFlag: 0,
                                createdBy: userRef,
                                messageRef: results.insertId
                            },
                            "DATA - CREATE_MESSAGE"
                            )
                        );
                    } else {
                        reject(
                            handleError(
                                "DATA - CREATE_MESSAGE query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - CREATE_MESSAGE could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default createMessage;