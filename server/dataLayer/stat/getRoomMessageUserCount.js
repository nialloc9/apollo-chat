import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = `
    SELECT
  (SELECT COUNT(*) FROM user) as user, 
  (SELECT COUNT(*) FROM room) as room,
  (SELECT COUNT(*) FROM message) as message
`;

/**
 * gets user room and message count.
 */
const getRoomMessageUserCount = () => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query, (error, results, fields) => {
                    connection.release();

                    if (!error) {
                        if (results.length > 0) {
                            resolve(
                                handleSuccess("stats found", results[0], "DATA - GET_ROOM_MESSAGE_USER_COUNT")
                            );
                        } else {
                            reject(
                                handleError("DATA - GET_ROOM_MESSAGE_USER_COUNT stats do not exist", { results: results[0] })
                            );
                        }
                    } else {
                        reject(
                            handleError(
                                "DATA - GET_ROOM_MESSAGE_USER_COUNT get room message user query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - GET_ROOM_MESSAGE_USER_COUNT could not connect to database to get user room message count",
                        error
                    )
                );
            }
        });
    });
};

export default getRoomMessageUserCount;
