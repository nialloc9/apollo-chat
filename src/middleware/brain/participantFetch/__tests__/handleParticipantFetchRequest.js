import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleParticipantFetchRequest from '../handleParticipantFetchRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleParticipantFetchRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        message: {
            offset: 0
        }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        roomRef: 1
    };

    it('calls the socket emit function', () => {
        store.dispatch(
            handleParticipantFetchRequest({
                socket,
                payload
            }),
        );

        expect(socket.emit).toHaveBeenCalled();
    });
});