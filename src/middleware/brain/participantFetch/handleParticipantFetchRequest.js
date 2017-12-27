import { PARTICIPANT_FETCH } from '../../../constants/socket';

const handleParticipantFetchRequest = ({ payload, socket }) => (dispatch, getState) => {

    const { roomRef } = payload;

    const { authorise: { jwToken, userRef } } = getState();

    socket.emit(PARTICIPANT_FETCH, {
        userRef,
        roomRef,
        jwToken
    });
};

export default handleParticipantFetchRequest;