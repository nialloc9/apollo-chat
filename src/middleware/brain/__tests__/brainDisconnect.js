import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import brainDisconnect from '../brainDisconnect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('brainDisconnect action', () => {
    const storeState = {
        authorise: {
            userRef: 1,
        },
        message: {
            roomRef: 1
        }
    };

    const store = mockStore(storeState);

    const payload = {};

    const socket = {
        emit: jest.fn()
    };

    it('emits a socket event', () => {
        const expectedActions = [];

        store.dispatch(
            brainDisconnect({socket, payload}),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});