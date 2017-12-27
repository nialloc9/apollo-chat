import Promise from "promise";
import getUserOnEmail from "../../dataLayer/user/getUserOnEmail";
import handleSuccess from "../../utils/handleSuccess";
import handleError from "../../utils/handleError";

/**
 * checks if email is unique in the database
 * @param email
 * @param unique
 * @returns {Promise}
 */
const checkUniqueEmail = (email, unique = true) => unique ? isUnique(email) : isNotUnique(email);

/**
 * used to check email does not have another match in the database
 * @param email
 * @returns {*|Promise}
 */
const isUnique = email => {
    return new Promise(async (resolve, reject) => {

        const userEmail = email;

        try {
            await getUserOnEmail(userEmail);

            reject(handleError("email already in use", { userEmail }, "SERVICE - CHECK_UNIQUE_EMAIL"))

        } catch (error){

            const { message } = error;

            if(message.indexOf("email does not exist") !== -1) {
                resolve(
                    handleSuccess(`email is not in use`, {
                        email
                    },
                        "SERVICE - CHECK_UNIQUE_EMAIL"
                    )
                );
            }

            reject(error);
        }
    });
};

/**
 * used to check if the email has a match in the database
 * @param email
 * @returns {*|Promise}
 */
const isNotUnique = email => {
    return new Promise(async (resolve, reject) => {

        const userEmail = email;

        try {
            await getUserOnEmail(userEmail);

            resolve(
                handleSuccess(`email is not in use`, {
                    email
                },
                    "SERVICE - CHECK_UNIQUE_EMAIL"
                )
            );

        } catch (error){

            const { message } = error;

            if(message.indexOf("email does not exist") !== -1) {
                reject(
                    handleError(`SERVICE - CHECK_UNIQUE_EMAIL email is not in use`, {
                        email
                    })
                );
            }

            reject(handleError("SERVICE - CHECK_UNIQUE_EMAIL internal error", error));
        }
    })
};

export default checkUniqueEmail;