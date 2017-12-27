import Promise from "promise";
import cp from "../../dataLayer/participant/createParticipant";
import getRoomOnRoomRef from "../../dataLayer/room/getRoomOnRoomRef";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * creates a participant in the database
 * @param roomRef
 * @param username
 * @param userRef
 * @returns {*|Promise}
 */
const createParticipant = ({ roomRef, username, userRef }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await checkParticipantExistsInRoom({ roomRef, userRef, exists: false })

            await cp({ roomRef, username, userRef });

            const roomData = await getRoomOnRoomRef(roomRef);

            const { data } = roomData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`${username} joined ${data.roomName}`, {
                    jwToken,
                    ...data
                },
                    "SERVICE - CREATE_PARTICIPANT"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default createParticipant;
