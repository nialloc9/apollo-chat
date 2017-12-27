import { ROOM_USER_FETCH } from '../../../constants/socket';

const handleRoomFetchRequest = (socket) => (dispatch, getState) => {
    const { authorise: { jwToken, userRef } } = getState();

    socket.emit(ROOM_USER_FETCH, {
        userRef,
        jwToken
    });
};

export default handleRoomFetchRequest;