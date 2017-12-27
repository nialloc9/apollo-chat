import Promise from "promise";
import getCount from "../../dataLayer/stat/getRoomMessageUserCount";
import handleSuccess from "../../utils/handleSuccess";

/**
 * fetch the room message and user cound
 * @returns {*|Promise}
 */
const getRoomMessageUserCount = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const count = await getCount();

            const { data } = count;

            resolve(
                handleSuccess(`stat count found`, data, "SERVICE - GET_ROOM_MESSAGE_USER_COUNT")
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getRoomMessageUserCount;