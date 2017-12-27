import log from '../utils/log';
import login from "../services/authorise/login";
import createUser from "../services/authorise/createUser";
import resetPasswordEmail from "../services/authorise/resetPasswordEmail";
import resetPassword from "../services/authorise/resetPassword";
import getRoomMessageUserCount from "../services/stat/getRoomMessageUserCount";
import { AUTHORISE_USER, AUTHORISE_USER_SUCCESS, AUTHORISE_USER_FAIL, AUTHORISE_USER_ERROR } from '../constants/authorise';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP_ERROR } from '../constants/signup';
import { FORGOTTEN_PASSWORD, FORGOTTEN_PASSWORD_ERROR, FORGOTTEN_PASSWORD_SUCCESS } from '../constants/forgottenPassword';
import { PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR } from '../constants/resetPassword';
import { STAT_FETCH, STAT_FETCH_SUCCESS, STAT_FETCH_ERROR } from '../constants/stat';
import requiredParam from '../utils/requiredParam';

const open = (socket) => {
    socket.on(AUTHORISE_USER, async ({email, password}) => {

        try {
            requiredParam({serviceName: AUTHORISE_USER, paramName: "EMAIL", param: email});
            requiredParam({serviceName: AUTHORISE_USER, paramName: "PASSWORD", param: password});

            log({ level: 'info', title: AUTHORISE_USER, message: "waiting" });
            const result = await login({ email, password });

            const { errorMessage } = result;

            !errorMessage ? socket.emit(AUTHORISE_USER_SUCCESS, result) : socket.emit(AUTHORISE_USER_FAIL, result);

        } catch ({ message }) {
            log({ level: 'error', title: AUTHORISE_USER, message });
            socket.emit(AUTHORISE_USER_ERROR, { errorMessage: message });
        } finally {
            socket.disconnect();
        }
    });

    socket.on(SIGN_UP, async ({email, password}) => {

        try {
            requiredParam({serviceName: SIGN_UP, paramName: "EMAIL", param: email});
            requiredParam({serviceName: SIGN_UP, paramName: "PASSWORD", param: password});

            log({ level: 'info', title: SIGN_UP, message: "waiting" });
            const result = await createUser({ email, password });

            const { errorMessage } = result;

            !errorMessage ? socket.emit(SIGN_UP_SUCCESS, result) : socket.emit(SIGN_UP_FAIL, result);

        } catch ({ message, data }) {
            log({ level: 'error', title: SIGN_UP, message });
            socket.emit(SIGN_UP_ERROR, { errorMessage: message });
        } finally {
            socket.disconnect();
        }
    });

    socket.on(FORGOTTEN_PASSWORD, async ({ email }) => {

        try {
            requiredParam({serviceName: FORGOTTEN_PASSWORD, paramName: "EMAIL", param: email});

            log({ level: 'info', title: FORGOTTEN_PASSWORD, message: "waiting" });
            const result = await resetPasswordEmail(email);

            socket.emit(FORGOTTEN_PASSWORD_SUCCESS, result)

        } catch ({ message }) {
            log({ level: 'error', title: FORGOTTEN_PASSWORD, message });
            socket.emit(FORGOTTEN_PASSWORD_ERROR, { errorMessage: message });
        } finally {
            socket.disconnect();
        }
    });

    socket.on(PASSWORD_RESET, async ({ email, token, password }) => {

        try {
            requiredParam({serviceName: PASSWORD_RESET, paramName: "email", param: email});
            requiredParam({serviceName: PASSWORD_RESET, paramName: "token", param: token});
            requiredParam({serviceName: PASSWORD_RESET, paramName: "password", param: password});

            log({ level: 'info', title: PASSWORD_RESET, message: "waiting" });
            const result = await resetPassword({ email, token, password });

            socket.emit(PASSWORD_RESET_SUCCESS, result)

        } catch ({ message }) {
            log({ level: 'error', title: PASSWORD_RESET, message });
            socket.emit(PASSWORD_RESET_ERROR, { errorMessage: message });
        } finally {
            socket.disconnect();
        }
    });

    socket.on(STAT_FETCH, async () => {

        try {
            log({ level: 'info', title: STAT_FETCH, message: "waiting" });
            const result = await getRoomMessageUserCount();

            socket.emit(STAT_FETCH_SUCCESS, result)

        } catch ({ message }) {
            log({ level: 'error', title: STAT_FETCH, message });
            socket.emit(STAT_FETCH_ERROR, { errorMessage: message });
        } finally {
            socket.disconnect();
        }
    });
};

export default open;