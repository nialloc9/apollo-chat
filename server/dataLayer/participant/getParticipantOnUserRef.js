import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = userRef => `SELECT * FROM participant WHERE userRef=${userRef} AND deletedFlag=0 LIMIT 1`;

/**
 * gets a participant from database using userRef.
 * @param userRef
 * @returns {*|Promise}
 */
const getParticipantOnUserRef = userRef => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(userRef), (error, results) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess(
                                    "participant found",
                                    results,
                                    "DATA - GET_PARTICIPANT_ON_USER_REF"
                                )
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_PARTICIPANT_ON_USER_REF participant not found", { userRef })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_PARTICIPANT_ON_USER_REF query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_PARTICIPANT_ON_USER_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default getParticipantOnUserRef;
