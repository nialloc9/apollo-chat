import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = roomRef => `
SELECT * FROM room WHERE roomRef=${roomRef} AND deletedFlag=0
`;

/**
 * gets room data from database using roomRef.
 * @param {string} roomRef
 * @returns {Promise}
 */
const getRoomOnRoomRef = roomRef => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(roomRef), (error, results) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("room found", results[0], "DATA - GET_ROOM_ON_ROOM_REF")
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_ROOM_ON_ROOM_REF room does not exist", { roomRef })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_ROOM_ON_ROOM_REF query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_ROOM_ON_ROOM_REF could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default getRoomOnRoomRef;
