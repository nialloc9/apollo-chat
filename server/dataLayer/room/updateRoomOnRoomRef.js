import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({
                   roomRef,
                   userRef
               }) =>
    `UPDATE room SET ? 
     WHERE roomRef='${roomRef}' AND deletedFlag='0' AND createdBy=${userRef}`;

/**
 * updates a user using userRef to identify.
 * @param roomRef
 * @param userRef
 * @param data
 * @returns {Promise}
 */
const updateRoomOnRoomRef = ({ roomRef, userRef, data }) => {
    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {

                let queryData = {
                    lastUpdatedBy: userRef,
                    lastUpdatedAt: null,
                    ...data
                };

                //optional remove null values
                if(!queryData.expire || queryData.expire === undefined){
                    delete queryData.expire;
                };

                if(!queryData.roomName || queryData.roomName === undefined){
                    delete queryData.roomName;
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
                                    handleSuccess(`room updated`, {
                                        roomRef,
                                        ...queryData
                                    },
                                    "DATA - UPDATE_ROOM_ON_ROOM_REF"
                                    )
                                );
                            } else {
                                reject(handleError("DATA - UPDATE_ROOM_ON_ROOM_REF room not found", error));
                            }
                        } else {
                            handleError(
                                handleError(
                                    "DATA - UPDATE_ROOM_ON_ROOM_REF update room by roomRef query could not be completed",
                                    error
                                )
                            );
                        }
                    }
                );
            } else {
                reject(
                    handleError(
                        "DATA - UPDATE_ROOM_ON_ROOM_REF could not connect to database to update room by roomRef",
                        error
                    )
                );
            }
        });
    });
};

export default updateRoomOnRoomRef;
