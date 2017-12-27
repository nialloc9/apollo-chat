import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = roomRef => `
SELECT DISTINCT count(messageRef) AS total
FROM message
        INNER JOIN user
            ON message.createdBy = user.userRef
        INNER JOIN participant
            ON message.createdBy = participant.userRef
where message.roomRef=${roomRef}  
AND message.deletedFlag=0 
AND user.deletedFlag=0 
AND participant.deletedFlag=0 
`;

/**
 * gets user room message total rows from database using roomRef.
 * @param roomRef
 * @returns {*|Promise}
 */
const getMessageTotalOnRoomRef = roomRef => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(roomRef), (error, results) => {
                    connection.release();
                    if (!error) {
                        resolve(handleSuccess(
                            "message total found",
                            results[0],
                            "DATA - GET_MESSAGE_TOTAL_ON_ROOM_REF"
                        ));
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_MESSAGE_TOTAL_ON_ROOM_REF query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_MESSAGE_TOTAL_ON_ROOM_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default getMessageTotalOnRoomRef;
