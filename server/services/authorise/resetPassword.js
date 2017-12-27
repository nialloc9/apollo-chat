import Promise from "promise";
import checkUniqueEmail from "./checkUniqueEmail";
import updateTokenOnEmailAndToken from '../../dataLayer/token/updateTokenOnEmailAndToken';
import getUserOnEmail from '../../dataLayer/user/getUserOnEmail';
import updateUserOnUserRef from '../../dataLayer/user/updateUserOnUserRef';
import handleSuccess from "../../utils/handleSuccess";
import hashPassword from "../../utils/hashPassword";
import jwtVerify from "../../utils/jwtVerify";

/**
 * creates a user in the database
 * @param email
 * @param token
 * @param password
 * @returns {Promise}
 */
const resetPassword = ({ email, token, password }) => {
    return new Promise(async (resolve, reject) => {

        const userEmail = email;

        try {

            jwtVerify(token);

            await checkUniqueEmail(userEmail, false);

            await updateTokenOnEmailAndToken({ token, email: userEmail, data: {
                deletedFlag: 1
            }});

            const user = await getUserOnEmail(userEmail);
            
            const { data: { userRef } } = user;

            const hashedPassword = hashPassword(password);

            await updateUserOnUserRef({ userRef, data: {
                password: hashedPassword
            }});

            resolve(
                handleSuccess(`${userEmail} reset`, {
                    userEmail
                },
                    "SERVICE - RESET_PASSWORD"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default resetPassword;
