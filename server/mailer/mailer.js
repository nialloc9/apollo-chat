import nodemailer from "nodemailer";
import handleError from "../utils/handleError";
import handleSuccess from "../utils/handleSuccess";
import config from "./config";

/**
 * sends an email to the specified email
 * @param subject
 * @param from
 * @param to
 * @param text
 * @param html
 * @private
 */
const mailer = ({ subject, from, to, text, html }) =>
    new Promise((resolve, reject) => {
        const mailOptions = {
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html // html body
        };

        // send mail with defined transport object
        nodemailer.createTransport(config).sendMail(mailOptions, (error, info) => {
            if (!error) {
                resolve(handleSuccess(`Message sent ${info.messageId}: ${info.response}`, {}));
            } else {
                reject(handleError(`could not send email`, error));
            }
        });
    });

export default mailer;
