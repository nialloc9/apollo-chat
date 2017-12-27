import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({ roomRef, userRef }) =>
    `UPDATE participant SET ? WHERE roomRef='${roomRef}' AND userRef='${userRef}' AND deletedFlag='0'`;

/**
 * updates a participant using roomRef and userRef to identify.
 * @param roomRef
 * @param userRef
 * @param data
 * @returns {Promise}
 */
const updateParticipantOnRoomRefAndUserRef = ({ roomRef, userRef, data }) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                const queryData = {
                    lastUpdatedBy: userRef,
                    lastUpdatedAt: null,
                    ...data
                };

                connection.query(
                    query({
                        roomRef,
                        userRef
                    }),
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
                                        "DATA - UPDATE_PARTICIPANT_ON_ROOM_REF_AND_USER_REF"
                                    )
                                );
                            } else {
                                reject(handleError("DATA - UPDATE_PARTICIPANT_ON_ROOM_REF_AND_USER_REF participant not found", error));
                            }
                        } else {
                            handleError(
                                handleError(
                                    "DATA - UPDATE_PARTICIPANT_ON_ROOM_REF_AND_USER_REF query could not be completed",
                                    error
                                )
                            );
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - UPDATE_PARTICIPANT_ON_ROOM_REF_AND_USER_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default updateParticipantOnRoomRefAndUserRef;
