import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomDeleteRequest from '../handleRoomDeleteRequest';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomDeleteRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        room: {
            data: [
                {
                    roomRef: 1,
                    deleteRoomLoading: false
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

    it('sets the deleteRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [
                        {
                            roomRef: 1,
                            deleteRoomLoading: true
                        }
                    ]
                }
            }
        ];

        store.dispatch(
            handleRoomDeleteRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});