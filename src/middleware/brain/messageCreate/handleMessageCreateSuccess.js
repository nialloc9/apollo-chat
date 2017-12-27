import { reset } from 'redux-form';
import { setAuthoriseJwToken } from '../../../actions/token';
import { MESSAGE_SET } from '../../../constants/message';
import { createTimestamp } from '../../../common/helpers';

/**
 * handles a successful message create event
 * @param response
 */
const handleMessageCreateSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds the new message to the current message data in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch, getState) => {

    const { jwToken, ...message } = roomData;

    const { message: { newMessages }, authorise: { userRef }, participant } = getState();

    const userParticipant = participant.data.filter(o => userRef === o.userRef);

    const { username, avatar } = userParticipant[0];

    dispatch({
        type: MESSAGE_SET,
        payload: {
            newMessages: [
                ...newMessages,
                {
                    ...message,
                    avatar,
                    username,
                    createdAt: createTimestamp()
                }
            ],
            messageCreateLoading: false
        }
    });

    dispatch(reset('sendMessageForm'));

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleMessageCreateSuccess;