import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomFetchSuccess from '../handleRoomFetchSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomFetchSuccess action', () => {

    const storeState = {
        room: {
            data: []
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            rooms: [
                {
                    roomRef: 1
                }
            ]
        }
    };

    it('sets the room data state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [{
                        roomRef: 1
                    }]
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
            handleRoomFetchSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});