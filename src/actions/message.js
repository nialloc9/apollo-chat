import {
    USER_MESSAGE_FETCH_REQUEST,
    USER_MESSAGE_CREATE_REQUEST,
    USER_MESSAGE_DELETE_REQUEST
} from '../constants/message';

/**
 * sets the roomRef to be used later by other actions
 * @param roomRef
 */
export const fetchMessages = roomRef => dispatch => {
    dispatch({
        type: USER_MESSAGE_FETCH_REQUEST,
        payload: {
            roomRef
        }
    });
};

/**
 * sends a new message request to room middleware
 * @param message
 */
export const setMessage  = ({ message }) => dispatch => {
    dispatch({
        type: USER_MESSAGE_CREATE_REQUEST,
        payload: {
            message
        }
    })
};

/**
 * sends a delete message request to room middleware
 * @param messageRef
 */
export const deleteMessage  = (messageRef) => dispatch => {
    dispatch({
        type: USER_MESSAGE_DELETE_REQUEST,
        payload: {
            messageRef
        }
    })
};