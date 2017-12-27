import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({roomRef, offset, limit, orderBy, orderDir}) => `
SELECT message.*,
        user.avatar,
        participant.username
FROM    message
        INNER JOIN user
            ON message.createdBy = user.userRef
        INNER JOIN participant
            ON message.createdBy = participant.userRef
where message.roomRef=${roomRef}  
AND message.deletedFlag=0 
AND user.deletedFlag=0 
AND participant.deletedFlag=0
ORDER BY ${orderBy} ${orderDir} ${limit !== -1 ? `limit ${limit} offset ${offset}` : ''} 
`;

/**
 * gets user room message data from database using roomRef.
 * @param roomRef
 * @param offset
 * @param limit
 * @param orderBy
 * @param orderDir
 * @returns {*|Promise}
 */
const getRoomMessagesOnRoomRef = ({roomRef, offset = 0, limit = -1, orderBy = "createdAt", orderDir = `DESC`}) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query({
                    roomRef,
                    offset,
                    limit,
                    orderBy,
                    orderDir
                }), (error, results) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess(
                                    "room messages found",
                                    results,
                                    "DATA - GET_MESSAGE_TOTAL_ON_ROOM_REF"
                                )
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_MESSAGE_TOTAL_ON_ROOM_REF room has no messages", { roomRef })
                            );
                        }
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

export default getRoomMessagesOnRoomRef;
