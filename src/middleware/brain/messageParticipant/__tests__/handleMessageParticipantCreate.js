import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageParticipantCreate from '../handleMessageParticipantCreate';
import { PUSH_SET } from '../../../../constants/push';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageParticipantCreate action', () => {

    // how facebook fixes not being able to change location. https://github.com/facebook/jest/issues/890
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: 'dev.test.co.uk:3000/room/2'
    });

    global.Math.round = () => "test";

    const storeState = {
        message: {
            newMessages: []
        }
    };

    const store = mockStore(storeState);

    const response = {
        message: {
            username: "test",
            roomRef: 1,
            message: "test"
        },
        roomName: "test"
    };

    it('sets the message messageFetchErrorMessage state', () => {
        const expectedActions = [
            {
                type: PUSH_SET,
                payload: {
                    message: `Test in test: test.`,
                    visibility: 'show'
                }
            }
        ];

        store.dispatch(
            handleMessageParticipantCreate(response),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});