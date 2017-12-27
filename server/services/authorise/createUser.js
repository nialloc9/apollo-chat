import Promise from "promise";
import createUserAccount from "../../dataLayer/user/createUser";
import checkUniqueEmail from "./checkUniqueEmail";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from "../../utils/createJwToken";

/**
 * creates a user in the database
 * @param email
 * @param password
 * @returns {Promise}
 */
const createUser = ({ email = "", password = "password" }) => {
    return new Promise(async (resolve, reject) => {

        const userEmail = email;

        try {
            await checkUniqueEmail(userEmail);

            const userData = await createUserAccount({ email: userEmail, password });

            const { data } = userData;

            const { userRef, email } = data;

            const jwToken = createJwToken(userRef);

            resolve(
                handleSuccess(`${email} created`, {
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

export default createUser;
