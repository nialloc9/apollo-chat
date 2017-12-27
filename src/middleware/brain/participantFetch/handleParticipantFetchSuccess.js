import { setAuthoriseJwToken } from '../../../actions/token';
import { PARTICIPANT_SET } from '../../../constants/participant';

/**
 * handles a successful participant fetch event
 * @param response
 */
const handleParticipantFetchSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds participant data in state and sets new jwToken
 * @param participantData
 */
const handleData = participantData => (dispatch) => {

    const { jwToken, participants } = participantData;

    dispatch({
        type: PARTICIPANT_SET,
        payload: {
            data: participants
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleParticipantFetchSuccess;