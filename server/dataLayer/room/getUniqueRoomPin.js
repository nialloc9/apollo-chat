import getRoomOnRoomPin from './getRoomOnRoomPin';
import generateRandomNumber from '../../utils/generateRandomNumber';
import handleSuccess from "../../utils/handleSuccess";

/**
 * creates and checks the database to ensure unique a roomPin
 * @param {string} roomPin
 * @returns {Promise}
 */
const getUniqueRoomPin = roomPin => {
    return new Promise(async (resolve, reject) => {

        let unique = false;
        let roomPin = null;
        let room = null;

        while(!unique){
            try {
                roomPin = generateRandomNumber();

                await getRoomOnRoomPin(roomPin);
            } catch (error) {
                const { message } = error;

                if(message.includes('room does not exist')){
                    unique = true;
                    resolve(handleSuccess(`unique roomPin ${roomPin} found`, { roomPin }), "DATA - GET_UNIQUE_ROOM_PIN")
                }

                reject(error);
            }
        }
    });
};

export default getUniqueRoomPin;