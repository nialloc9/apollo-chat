import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomJoinSuccess from '../handleRoomJoinSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomJoinSuccess action', () => {

    const storeState = {
        room: {
            data: []
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            roomRef: 1
        }
    };

    it('sets the room data editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [
                        {
                            roomRef: 1
                        }
                    ],
                    joinRoomPage: 1,
                    joinRoomLoading: false
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
            handleRoomJoinSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});