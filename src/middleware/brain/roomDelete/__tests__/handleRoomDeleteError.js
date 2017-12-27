import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomDeleteError from '../handleRoomDeleteError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomDeleteError action', () => {
    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1,
                    deleteRoomLoading: true
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const error = {
        errorMessage: "ERROR: test"
    };

    it('sets the message deleteRoomErrorMessage state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    deleteRoomErrorMessage: 'An error has occurred',
                    deleteRoomError: error,
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
            handleRoomDeleteError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});