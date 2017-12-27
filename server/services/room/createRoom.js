import Promise from "promise";
import cr from "../../dataLayer/room/createRoom";
import createParticipant from '../participant/createParticipant';
import getUserRoomsOnUserRef from './getUserRoomsOnUserRef';
import handleSuccess from "../../utils/handleSuccess";
import handleError from "../../utils/handleError";
import log from "../../utils/log";
import { withinFutureDays } from "../../utils/dateComparision";

const roomLimit = 3;

/**
 * fetches the users rooms from the database
 * @param ref
 */
const fetchUserRooms = ref =>
    new Promise(async (resolve, reject) => {

        const userRef = ref;

        try {
            const userRoomData = await getUserRoomsOnUserRef({ userRef });

            resolve(userRoomData);
        } catch (error){

            const { message } = error;

            if(message.indexOf("user has no rooms") !== -1){
                resolve(handleSuccess('user has no rooms', { rooms: [] }, "SERVICE - CREATE_ROOM"))
            }

            reject(error);
        }
    });

/**
 * creates a room in the database
 * @param roomName
 * @param expire
 * @param username
 * @param userRef
 * @returns {*|Promise}
 */
const createRoom = ({ userRef, roomName, username, expire }) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!withinFutureDays(expire)){
                log({
                    title: 'SERVICE - CREATE_ROOM',
                    level: "error",
                    message: "expire is not within allowed dates"
                });

                reject(handleError('SERVICE - CREATE_ROOM expire is not within allowed dates', { expire }))
            } else {

                const userRoomData = await fetchUserRooms(userRef);

                const userRooms = userRoomData.data;

                const rooms = userRooms.rooms;

                rooms.length > roomLimit && reject(handleError(`SERVICE - CREATE_ROOM user has exceeded room limit`, { userRef , roomLimit }));

                const room = await cr({ roomName, expire, userRef });

                const roomData = room.data;

                const { roomRef } = roomData;

                const participant = await createParticipant({ roomRef, username, userRef });

                const participantData = participant.data;

                const { jwToken } = participantData;

                resolve(
                    handleSuccess(`${roomName} created`, {
                        ...roomData,
                        members: 1,
                        jwToken
                    },
                        "SERVICE - CREATE_ROOM"
                    )
                );
            }
        } catch (error){
            reject(error);
        }
    });
};

export default createRoom;
