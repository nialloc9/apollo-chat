import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomCreateSuccess from '../handleRoomCreateSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomCreateSuccess action', () => {

    global.Math.round = () => "test";

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

    it('sets the room data state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    data: [
                        {
                            roomRef: 1
                        }
                    ],
                    createRoomPage: 1,
                    createRoomLoading: false
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
            handleRoomCreateSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});