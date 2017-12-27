import Promise from "promise";
import checkParticipantExistsInRoom from "../../dataLayer/participant/checkParticipantExistsInRoom";
import cm from "../../dataLayer/message/createMessage";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * creates a message in the database
 * @param roomRef
 * @param userRef
 * @param message
 * @returns {*|Promise}
 */
const createMessage = ({ roomRef, userRef, message }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await checkParticipantExistsInRoom({
                userRef,
                roomRef,
            });

            const messageData = await cm({ roomRef, userRef, message });

            const { data } = messageData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`message created`, {
                    jwToken,
                    ...data
                },
                    "SERVICE - CREATE_MESSAGE"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default createMessage;
