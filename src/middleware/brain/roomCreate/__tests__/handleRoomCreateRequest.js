import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomCreateRequest from '../handleRoomCreateRequest';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomCreateRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        roomName: "test",
        username: "test",
        expire: "test"
    };

    it('sets the roomRef state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    createRoomLoading: true
                }
            }
        ];

        store.dispatch(
            handleRoomCreateRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});