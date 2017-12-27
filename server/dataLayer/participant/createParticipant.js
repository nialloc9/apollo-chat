import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = "INSERT INTO participant SET ?";

/**
 * creates a new participant in the database
 * @param roomRef
 * @param username
 * @param userRef
 * @returns {*|Promise}
 */
const createParticipant = ({ userRef, username, roomRef }) => {

    const data = {
        userRef,
        roomRef,
        username,
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
                            handleSuccess("participant created", {
                                ...data,
                                deletedFlag: 0,
                                createdBy: userRef,
                                roomRef: results.insertId
                            },
                                "DATA - CREATE_PARTICIPANT"
                            )
                        );
                    } else {
                        reject(
                            handleError(
                                "DATA - CREATE_PARTICIPANT query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - CREATE_PARTICIPANT could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default createParticipant;
