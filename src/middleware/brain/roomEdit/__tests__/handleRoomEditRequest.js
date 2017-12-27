import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomEditRequest from '../handleRoomEditRequest';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomEditRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        room: {
            data: [
                {
                    roomRef: 1,
                    roomName: "test",
                    editRoomLoading: false
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        roomRef: 1,
        roomName: "newTest"
    };

    it('sets the editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [{
                        roomRef: 1,
                        editRoomLoading: true,
                        roomName: "newTest"
                    }]
                }
            }
        ];

        store.dispatch(
            handleRoomEditRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});