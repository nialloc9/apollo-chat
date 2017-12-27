import log from '../utils/log';
import createTimestamp from './createTimestamp';

/**
 * returns a result object
 * @param successMessage
 * @param data
 * @param title
 * @param level
 * @returns {{result: {successMessage: string, data: *}}}
 * @private
 */
const handleSuccess = (successMessage, data, title = "SERVER", level = "info") =>{

    log({
        title,
        level,
        message: successMessage
    });

    return {
        successMessage: `SUCCESS: ${successMessage} : (${createTimestamp()})`,
        data
    }
};

export default handleSuccess;
