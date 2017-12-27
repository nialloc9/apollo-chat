import Promise from "promise";
import Database from "../../database";
import getUniqueRoomPin from './getUniqueRoomPin';
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";
import createTimestamp from "../../utils/createTimestamp";

const query = "INSERT INTO room SET ?";

/**
 * creates a new room in the database
 * @param roomName
 * @param expire
 * @param userRef
 * @returns {*|Promise}
 */
const createRoom = async ({ roomName, expire, userRef }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const unique = await getUniqueRoomPin();

            const { data: { roomPin } } = unique;

            const data = {
                roomName,
                roomPin,
                expire: createTimestamp(expire),
                createdBy: userRef,
                lastUpdatedBy: userRef
            };

            Database.getConnection((error, connection) => {
                if (!error) {
                    connection.query(query, data, (error, results) => {
                        connection.release();
                        if (!error) {
                            resolve(
                                handleSuccess("room created", {
                                    ...data,
                                    deletedFlag: 0,
                                    createdBy: userRef,
                                    roomRef: results.insertId
                                },
                                    "DATA - CREATE_ROOM"
                                )
                            );
                        } else {
                            reject(
                                handleError(
                                    "DATA - CREATE_ROOM query could not be completed",
                                    error
                                )
                            );
                        }
                    });
                } else {
                    reject(
                        handleError(
                            "DATA - CREATE_ROOM could not connect to database",
                            error
                        )
                    );
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default createRoom;
