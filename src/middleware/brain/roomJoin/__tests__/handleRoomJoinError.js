import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomJoinError from '../handleRoomJoinError';
import { ROOM_SET } from '../../../../constants/room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomJoinError action', () => {
    const storeState = {};

    const store = mockStore(storeState);

    const error = {
        errorMessage: "participant already exists in room"
    };

    it('sets the room joinRoomErrorMessage state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    joinRoomErrorMessage: "You are already a member of this room.",
                    joinRoomError: error,
                    joinRoomLoading: false
                }
            }
        ];

        store.dispatch(
            handleRoomJoinError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});