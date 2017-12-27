import Promise from "promise";
import bcrypt from "bcryptjs";
import getUserOnEmail from "../../dataLayer/user/getUserOnEmail";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * verifies the user and updates rememberMe if applicable before returning user data
 * @param email
 * @param password
 * @returns {Promise}
 */
const login = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {

        try {
            const userData = await getUserOnEmail(email);

            const { data } = userData;

            const dbPassword = data.password;

            delete data.password;

            !bcrypt.compareSync(password, dbPassword) && reject(
                reject(handleError("SERVICE - LOGIN invalid email/password combination", {
                    email
                }))
            );

            const { userRef } = data;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`${email} returned`, {
                    jwToken,
                    ...data
                },
                    "SERVICE - CREATE_USER"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default login;
