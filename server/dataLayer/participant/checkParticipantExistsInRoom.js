import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({roomRef, userRef}) => `
SELECT * FROM participant WHERE roomRef=${roomRef} AND userRef=${userRef} AND deletedFlag=0
`;

/**
 * gets participant data from database using userRef and roomRef.
 * @param {number} roomRef
 * @param {number} userRef
 * @param {bool} exists
 * @returns {Promise}
 */
const checkParticipantExistsInRoom = ({roomRef, userRef, exists = true}) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query({roomRef, userRef}), (error, results) => {
                    connection.release();
                    if (!error) {

                        if(exists){
                            if (results.length > 0) {
                                resolve(
                                    handleSuccess("participant exists in room", results[0], "DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM")
                                );
                            } else {
                                reject(
                                    handleError("DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM participant does not exist in room", { userRef, roomRef })
                                );
                            }
                        }

                        if(!exists){
                            if (results.length > 0) {
                                reject(
                                    handleError("DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM participant already exists in room", results[0])
                                );
                            } else {
                                resolve(
                                    handleSuccess("DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM participant does not exist in room", { userRef, roomRef })
                                );
                            }
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - CHECK_PARTICIPANT_EXISTS_IN_ROOM could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default checkParticipantExistsInRoom;
