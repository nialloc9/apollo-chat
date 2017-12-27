import Promise from "promise";
import getRooms from "../../dataLayer/room/getUserRoomsOnUserRef";
import getParticipantTotalOnRoomRef from "../../dataLayer/participant/getParticipantTotalOnRoomRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * adds the total participants as members to the room values
 * @param rooms
 * @returns {*|Promise}
 */
const addMembers = rooms => {
    return new Promise(async (resolve, reject) => {
        let newRooms = [];
        let i = 0;

        while(newRooms.length !== rooms.length){
            let totalParticipants = await getParticipantTotalOnRoomRef(rooms[i].roomRef);

            let { data: { total } } = totalParticipants;

            newRooms.push({
                ...rooms[i],
                members :total
            });

            i++;
        }

        if(newRooms.length === rooms.length){
            resolve(newRooms);
        }
    })
};
/**
 * gets user rooms
 * @param userRef
 * @param limit
 * @param offset
 * @returns {*|Promise}
 */
const getUserRoomsOnUserRef = ({ userRef, limit = -1, offset = 0 }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const roomData = await getRooms({ userRef, limit, offset });

            const { data } = roomData;

            const newData = await addMembers(data);

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`user rooms found`, {
                    jwToken,
                    rooms: newData
                },
                    "SERVICE - GET_USER_ROOMS_ON_USER_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getUserRoomsOnUserRef;