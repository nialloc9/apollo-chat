import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomParticipantDestroy from '../handleRoomParticipantDestroy';
import { ROOM_SET } from '../../../../constants/room';
import { PUSH_SET } from '../../../../constants/push';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomParticipantDestroy action', () => {
    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1,
                    roomName: "test"
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const response = {
        roomRef: 1
    };

    it('sets the room data state and sends a push notification', () => {
        const expectedActions = [
            {
                type: PUSH_SET,
                payload: {
                    message: `test has gone away.`,
                    visibility: 'show'
                }
            },
            {
                type: ROOM_SET,
                payload: {
                    data: []
                }
            }
        ];

        store.dispatch(
            handleRoomParticipantDestroy(response),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});