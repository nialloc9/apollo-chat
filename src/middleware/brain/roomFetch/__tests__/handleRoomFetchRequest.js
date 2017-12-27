import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomFetchRequest from '../handleRoomFetchRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomFetchRequest action', () => {

    const storeState = {
        authorise: { jwToken: "test", userRef: 1 }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    it('calls socket emit', () => {
        const expectedActions = [];

        store.dispatch(
            handleRoomFetchRequest(socket)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});