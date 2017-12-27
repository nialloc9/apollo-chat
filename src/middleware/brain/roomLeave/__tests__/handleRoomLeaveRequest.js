import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomLeaveRequest from '../handleRoomLeaveRequest';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomLeaveRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        room: {
            data: [
                {
                    roomRef: 1,
                    leaveRoomLoading: true
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        roomRef: 1
    };

    it('sets the data leaveRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [{
                        roomRef: 1,
                        leaveRoomLoading: true
                    }]
                }
            }
        ];

        store.dispatch(
            handleRoomLeaveRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});