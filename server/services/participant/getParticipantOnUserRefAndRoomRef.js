import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * fetches a participant in the database
 * @param roomRef
 * @param userRef
 * @returns {*|Promise}
 */
const getParticipantOnUserRefAndRoomRef = ({ roomRef, userRef }) => {
    return new Promise(async (resolve, reject) => {
        try {

            const result = await checkParticipantExistsInRoom({ roomRef, userRef });

            const { data } = result;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`participant found: ${userRef}`, {
                    jwToken,
                    ...data
                },
                    "SERVICE - GET_PARTICIPANT_ON_USER_REF_AND_ROOM_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getParticipantOnUserRefAndRoomRef;