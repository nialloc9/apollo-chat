import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = roomPin => `
SELECT * FROM room WHERE roomPin=${roomPin} AND deletedFlag=0 AND expire<=CURRENT_TIMESTAMP
`;

/**
 * gets room data from database using roomPin.
 * @param {string} roomPin
 * @returns {Promise}
 */
const getRoomOnRoomPin = roomPin => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query(roomPin), (error, results) => {
                    connection.release();
                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("room found", results[0], "DATA - GET_ROOM_ON_ROOM_PIN")
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_ROOM_ON_ROOM_PIN room does not exist", { roomPin })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_ROOM_ON_ROOM_PIN query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_ROOM_ON_ROOM_PIN could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default getRoomOnRoomPin;
