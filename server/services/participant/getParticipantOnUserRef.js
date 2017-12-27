import Promise from "promise";
import getParticipantOnUserRef from "../../dataLayer/participant/getParticipantOnUserRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * fetches the participant using userREf
 * @param userRef
 * @returns {*|Promise}
 */
const getParticipantsOnUserRef = userRef => {
    return new Promise(async (resolve, reject) => {
        try {

            const participantData = await getParticipantOnUserRef(userRef);

            const { data } = participantData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`participant found`, {
                    jwToken,
                    participant: data
                },
                    "SERVICE - GET_PARTICIPANT_ON_USER_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getParticipantsOnUserRef;