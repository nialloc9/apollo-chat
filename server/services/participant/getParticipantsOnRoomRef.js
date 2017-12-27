import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import getParticipants from "../../dataLayer/participant/getParticipantsOnRoomRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * fetches the participants for that room if a user is a participant
 * @param userRef
 * @param roomRef
 * @param limit
 * @param offset
 * @returns {*|Promise}
 */
const getParticipantsOnRoomRef = ({ userRef, roomRef, limit, offset }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef
            });

            const participantData = await getParticipants({ roomRef, limit, offset });

            const { data } = participantData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`participants found`, {
                    jwToken,
                    participants: data
                },
                    "SERVICE - GET_PARTICIPANTS_ON_ROOM_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getParticipantsOnRoomRef;