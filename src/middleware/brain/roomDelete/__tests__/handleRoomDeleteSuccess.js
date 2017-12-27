import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomDeleteSuccess from '../handleRoomDeleteSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomDeleteSuccess action', () => {

    global.Math.round = () => "test";

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
            deletedRoomRef: 1
        }
    };

    it('sets the room data state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [],
                    deleteRoomSuccessMessage: "Room deleted"
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
            handleRoomDeleteSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});