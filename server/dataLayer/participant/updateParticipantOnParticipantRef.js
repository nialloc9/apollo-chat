import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = participantRef =>
    `UPDATE participant SET ? WHERE participantRef='${participantRef}' AND deletedFlag='0'`;

/**
 * updates a participant using participantRef to identify.
 * @param participantRef
 * @param userRef
 * @param data
 * @returns {Promise}
 */
const updateParticipantOnParticipantRef = ({ participantRef, userRef, data }) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                const queryData = {
                    lastUpdatedBy: userRef,
                    lastUpdatedAt: null,
                    ...data
                };

                connection.query(
                    query(participantRef),
                    queryData,
                    (error, results, fields) => {
                        connection.release();

                        if (!error) {
                            const { affectedRows } = results;

                            if (affectedRows > 0) {
                                resolve(
                                    handleSuccess(`participant updated`, {
                                        results,
                                        fields
                                    },
                                        "DATA - UPDATE_PARTICIPANT_ON_PARTICIPANT_REF"
                                    )
                                );
                            } else {
                                reject(handleError("participant not found", error));
                            }
                        } else {
                            handleError(
                                handleError(
                                    "DATA - GET_TOTAL_PARTICIPANTS_ON_ROOM_REF query could not be completed",
                                    error
                                )
                            );
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - GET_TOTAL_PARTICIPANTS_ON_ROOM_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default updateParticipantOnParticipantRef;
