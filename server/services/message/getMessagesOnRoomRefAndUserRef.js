import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import getRoomMessagesOnRoomRef from "../../dataLayer/message/getRoomMessagesOnRoomRef";
import getMessageTotalOnRoomRef from "../../dataLayer/message/getMessageTotalOnRoomRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * fetches the messages for that room if a user is a participant
 * @param userRef
 * @param roomRef
 * @param limit
 * @param offset
 * @param orderBy
 * @param orderDir
 * @returns {*|Promise}
 */
const getMessagesOnRoomRefAndUserRef = ({ userRef, roomRef, limit, offset, orderBy = "createdAt", orderDir = "ASC" }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef
            });

            const messageData = await getRoomMessagesOnRoomRef({ roomRef, limit, offset, orderBy, orderDir });

            const messageTotal = await getMessageTotalOnRoomRef(roomRef);

            const { total } = messageTotal.data;

            const { data } = messageData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`messages found`, {
                    jwToken,
                    total,
                    messages: data
                },
                    "SERVICE - GET_MESSAGES_ON_ROOM_REF_AND_USER_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getMessagesOnRoomRefAndUserRef;