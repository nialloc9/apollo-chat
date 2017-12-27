import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = roomRef => `
SELECT DISTINCT count(participantRef) AS total
FROM participant 
INNER JOIN user on participant.userRef = user.userRef
WHERE participant.roomRef=${roomRef}
AND participant.deletedFlag=0 
AND user.deletedFlag=0 
`;


/**
 * gets room participant count from database using roomRef.
 * @param roomRef
 * @returns {*|Promise}
 */
const getParticipantTotalOnRoomRef = roomRef => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(roomRef), (error, results) => {
                    connection.release();
                    if (!error) {
                        resolve(handleSuccess(
                            "participant total found",
                            results[0],
                            "DATA - GET_TOTAL_PARTICIPANTS_ON_ROOM_REF"
                        ));
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_TOTAL_PARTICIPANTS_ON_ROOM_REF query could not be completed",
                                error
                            )
                        );
                    }
                });
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

export default getParticipantTotalOnRoomRef;
