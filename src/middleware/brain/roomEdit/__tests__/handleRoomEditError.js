import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomEditError from '../handleRoomEditError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomEditError action', () => {
    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1,
                    editRoomLoading: false
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const error = {
        data: {
            test: "test"
        }
    };

    it('sets the room editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    editRoomErrorMessage: "An error has occurred",
                    editRoomError: {
                        test: "test"
                    },
                    data: [{
                        roomRef: 1,
                        editRoomLoading: false
                    }]
                }
            }
        ];

        store.dispatch(
            handleRoomEditError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});