import io from 'socket.io-client';

const { REACT_APP_API_ADDRESS } = process.env;

const initializeSocket = () => io(`${REACT_APP_API_ADDRESS}/api/brain`, {
    secure: true
});

export default initializeSocket;