import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomCreateError from '../handleRoomCreateError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomCreateError action', () => {
    const storeState = {};

    const store = mockStore(storeState);

    const error = {
        errorMessage: "ERROR: user has exceeded room limit"
    };

    it('sets the message createRoomErrorMessage state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    createRoomErrorMessage: 'Room limit reached',
                    createRoomError: error,
                    createRoomLoading: false
                }
            }
        ];

        store.dispatch(
            handleRoomCreateError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});