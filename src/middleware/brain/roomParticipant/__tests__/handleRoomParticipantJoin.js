import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomParticipantJoin from '../handleRoomParticipantJoin';
import { PARTICIPANT_SET } from '../../../../constants/participant';
import { PUSH_SET } from '../../../../constants/push';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomParticipantJoin action', () => {

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
                    roomName: "test"
                }
            ]
        },
        participant: {
            data: []
        }
    };

    const store = mockStore(storeState);

    const response = {
        roomRef: 1,
        username: "test",
    };

    it('sets the participant data state and sends a push notification', () => {
        const expectedActions = [
            {
                type: PARTICIPANT_SET,
                payload: {
                    data: [response]
                }
            }
        ];

        store.dispatch(
            handleRoomParticipantJoin(response),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});