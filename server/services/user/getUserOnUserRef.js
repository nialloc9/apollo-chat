import Promise from "promise";
import getUser from "../../dataLayer/user/getUserOnUserRef";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * fetches the user
 * @param userRef
 * @returns {*|Promise}
 */
const getUserOnUserRef = userRef => {
    return new Promise(async (resolve, reject) => {
        try {

            const userData = await getUser(userRef);

            const { data } = userData;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`user found`, {
                    jwToken,
                    user: data
                },
                    "SERVICE - GET_USER_ON_USER_REF"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default getUserOnUserRef;