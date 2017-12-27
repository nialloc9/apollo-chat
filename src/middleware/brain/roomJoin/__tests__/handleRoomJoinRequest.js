import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomJoinRequest from '../handleRoomJoinRequest';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomJoinRequest action', () => {
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
        roomPin: 1,
        username: "test"
    };

    it('sets the editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    joinRoomLoading: true
                }
            }
        ];

        store.dispatch(
            handleRoomJoinRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});