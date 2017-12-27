import { BRAIN_DISCONNECT } from '../../constants/brain';

/**
 * sends a brain disconnect event to the server
 * @param socket
 * @param payload
 */
const brainDisconnect = ({ socket, payload }) => (dispatch, getState) => {

    const { authorise: { userRef }, message: { roomRef } } = getState();

    socket.emit(BRAIN_DISCONNECT, {
        roomRef,
        userRef
    });
};

export default brainDisconnect;