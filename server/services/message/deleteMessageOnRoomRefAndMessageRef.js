import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import updateMessageOnMessageRef from "../../dataLayer/message/updateMessageOnMessageRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * deletes a message
 * @param userRef
 * @param roomRef
 * @returns {*|Promise}
 */
const deleteMessageOnRoomRefAndMessageRef = ({ userRef, roomRef, messageRef }) => {
    return new Promise(async (resolve, reject) => {

        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef,
            });

            await updateMessageOnMessageRef({
                userRef,
                messageRef,
                data: {
                    deletedFlag: 1
                }
            });

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`message deleted`, {
                    jwToken,
                    messageRef
                },
                    "SERVICE - DELETE_MESSAGE_ON_ROOM_REF_AND_MESSAGE_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default deleteMessageOnRoomRefAndMessageRef;