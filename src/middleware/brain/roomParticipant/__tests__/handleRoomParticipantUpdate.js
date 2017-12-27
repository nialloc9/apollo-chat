import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomParticipantUpdate from '../handleRoomParticipantUpdate';
import { ROOM_SET } from '../../../../constants/room';
import { PUSH_SET } from '../../../../constants/push';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomParticipantUpdate action', () => {

    // how facebook fixes not being able to change location. https://github.com/facebook/jest/issues/890
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: 'dev.test.co.uk:3000/room/1'
    });

    const storeState = {
        room: {
            data: [
                {
                    roomRef: 1,
                    roomName: "room"
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const response = {
        roomRef: 1,
        roomName: "test",
    };

    it('sets the room data state and sends a push notification', () => {
        const expectedActions = [
            {
                type: PUSH_SET,
                payload: {
                    message: `room has changed name to test.`,
                    visibility: 'show'
                }
            },
            {
                type: ROOM_SET,
                payload: {
                    data: [{
                        roomRef: 1,
                        roomName: "test"
                    }]
                }
            }
        ];

        store.dispatch(
            handleRoomParticipantUpdate(response),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});