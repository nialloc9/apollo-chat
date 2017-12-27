import Promise from "promise";
import updateParticipantOnRoomRefAndUserRef from "../../dataLayer/participant/updateParticipantOnRoomRefAndUserRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * deletes a room
 * @param userRef
 * @param roomRef
 * @returns {*|Promise}
 */
const deleteParticipantOnRoomRefAndUserRef = ({ userRef, roomRef }) => {
    return new Promise(async (resolve, reject) => {
        try {
            await updateParticipantOnRoomRefAndUserRef({
                userRef,
                roomRef,
                data: {
                    deletedFlag: 1
                }
            });

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`room left`, {
                    jwToken,
                    leftRoomRef: roomRef
                },
                    "SERVICE - DELETE_PARTICIPANT_ON_ROOM_REF_AND_USER_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default deleteParticipantOnRoomRefAndUserRef;