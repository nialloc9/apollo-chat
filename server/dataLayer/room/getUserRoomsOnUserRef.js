import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({userRef, offset, limit, orderBy, orderDir}) => `
SELECT DISTINCT room.*
FROM room
INNER JOIN participant ON participant.roomRef = room.roomRef where participant.userRef = ${userRef} 
AND room.deletedFlag=0 AND participant.deletedFlag=0 AND room.expire<=CURRENT_TIMESTAMP
ORDER BY ${orderBy} ${orderDir} ${limit !== -1 ? `limit ${limit} offset ${offset}` : ''}
`;

/**
 * gets user room data from database using userRef.
 * @param userRef
 * @param offset
 * @param limit
 * @param orderBy
 * @param orderDir
 * @returns {*|Promise}
 */
const getUserRoomsOnUserRef = ({userRef, offset = 0, limit = -1, orderBy = "createdAt", orderDir = "DESC"}) => {
    return new Promise( async (resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query({
                    userRef,
                    offset,
                    limit,
                    orderBy,
                    orderDir
                }), (error, results) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("DATA - GET_USER_ROOMS_ON_USER_REF user rooms found", results)
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_USER_ROOMS_ON_USER_REF user has no rooms", results)
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_USER_ROOMS_ON_USER_REF get user rooms on userRef query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_USER_ROOMS_ON_USER_REF could not connect to database to get user rooms on userRef",
                        error
                    )
                );
            }
        });
    });
};

export default getUserRoomsOnUserRef;
