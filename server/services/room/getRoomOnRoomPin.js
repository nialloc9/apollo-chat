import Promise from "promise";
import getRoom from "../../dataLayer/room/getRoomOnRoomPin";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * gets room using roomPin
 * @param roomPin
 * @param userRef
 * @returns {*|Promise}
 */
const getUserRoomsOnUserRef = ({ roomPin, userRef }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const roomData = await getRoom(roomPin);

            const { data } = roomData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`room found`, {
                    jwToken,
                    room: data
                },
                    "SERVICE - GET_ROOM_ON_ROOM_PIN"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getUserRoomsOnUserRef;