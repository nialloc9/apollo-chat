import createTimestamp from './createTimestamp';

/**
 * sets an error message in terminal and returns an error object
 * @param errorMessage
 * @param err
 * @returns {{error: {errorMessage: string, data: {error: *}}}}
 * @private
 */
const handleError = (errorMessage, err) => ({
    message: `ERROR: ${errorMessage} :  (${createTimestamp()})`,
    data: err
});

export default handleError;
