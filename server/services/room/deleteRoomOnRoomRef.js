import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import updateRoomOnRoomRef from "../../dataLayer/room/updateRoomOnRoomRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * deletes a room
 * @param userRef
 * @param roomRef
 * @returns {*|Promise}
 */
const deleteRoomOnRoomRef = ({ userRef, roomRef }) => {
    return new Promise(async (resolve, reject) => {

        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef
            });

            await updateRoomOnRoomRef({
                userRef,
                roomRef,
                data: {
                    deletedFlag: 1
                }
            });

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`room deleted`, {
                    jwToken,
                    deletedRoomRef: roomRef
                },
                    "SERVICE - DELETE_ROOM_ON_ROOM_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default deleteRoomOnRoomRef;