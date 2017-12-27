import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomLeaveError from '../handleRoomLeaveError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomLeaveError action', () => {
    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1,
                    leaveRoomLoading: false
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const error = {
        errorMessage: "ERROR: test"
    };

    it('sets the room editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    leaveRoomErrorMessage: "An error has occurred",
                    leaveRoomError: error,
                    data: [
                        {
                            roomRef: 1,
                            leaveRoomLoading: false
                        }
                    ]
                }
            }
        ];

        store.dispatch(
            handleRoomLeaveError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});