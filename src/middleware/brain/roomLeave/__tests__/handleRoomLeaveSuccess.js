import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomLeaveSuccess from '../handleRoomLeaveSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomLeaveSuccess action', () => {

    const storeState = {
        room: {
            data: [{
                roomRef: 1
            }]
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            leftRoomRef: 1
        }
    };

    it('sets the room data leaveRoomSuccessMessage state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [],
                    leaveRoomSuccessMessage: "Room left"
                }
            },
            {
                type: AUTHORISE_SET,
                payload: {
                    jwToken: "test"
                }
            }
        ];

        store.dispatch(
            handleRoomLeaveSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});