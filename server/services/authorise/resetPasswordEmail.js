import Promise from "promise";
import Crypto from 'crypto';
import createToken from "../../dataLayer/token/createToken";
import checkUniqueEmail from "./checkUniqueEmail";
import handleSuccess from "../../utils/handleSuccess";
import createJwToken from '../../utils/createJwToken';
import mailer from '../../mailer';
import resetEmailTemplate from '../../mailer/templates/resetEmail';

/**
 * creates a user in the database
 * @param email
 * @returns {Promise}
 */
const createResetPassword = email => {
    return new Promise(async (resolve, reject) => {

        const userEmail = email;

        try {
            await checkUniqueEmail(userEmail, false);

            const jwToken = createJwToken(Crypto.randomBytes(20).toString('hex'));

            await createToken(jwToken, userEmail);

            const tokenLink = `http://dev.titan.co.uk:3000/password-reset/${jwToken}/email/${email}`;

            await mailer({
                to: email,
                from: "noreply@titan.com",
                subject: "titan.co.uk authentication",
                text: null,
                html: resetEmailTemplate({
                    tokenLink
                })
            });

            resolve(
                handleSuccess(`email sent to ${email}`, {
                    email
                },
                    "SERVICE - RESET_PASSWORD_EMAIL"
                )
            );
        } catch (error){
            reject(error);
        }
    });
};

export default createResetPassword;
