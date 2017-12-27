import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import updateRoom from "../../dataLayer/room/updateRoomOnRoomRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * updates a room
 * @param userRef
 * @param roomRef
 * @param roomName
 * @param expire
 * @returns {*|Promise}
 */
const updateRoomOnRoomRef = ({ userRef, roomRef, roomName, expire }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef
            });

            const roomData = await updateRoom({
                userRef,
                roomRef,
                data: {
                    roomName,
                    expire
                }
            });

            const { data } = roomData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`room updated`, {
                    ...data,
                    jwToken,
                    roomRef
                },
                    "SERVICE - UPDATE_ROOM_ON_ROOM_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default updateRoomOnRoomRef;