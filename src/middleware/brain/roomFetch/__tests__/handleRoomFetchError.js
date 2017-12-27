import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomFetchError from '../handleRoomFetchError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomFetchError action', () => {
    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const error = {
        errorMessage: "could not find user rooms"
    };

    it('sets the room fetchRoomsErrorMessage state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    fetchRoomsErrorMessage: 'Oh no rooms? Create or join on the right.',
                    fetchRoomsError: error
                }
            }
        ];

        store.dispatch(
            handleRoomFetchError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});