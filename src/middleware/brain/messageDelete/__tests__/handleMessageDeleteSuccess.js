import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageDeleteSuccess from '../handleMessageDeleteSuccess';
import { MESSAGE_SET } from '../../../../constants/message';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageDeleteSuccess action', () => {

    global.Math.round = () => "test";

    const storeState = {
        message: {
            roomRef: 1,
            data: [{
                messageRef: 1
            }],
            newMessages: [{
                messageRef: 1
            }],
            total: 1
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            messageRef: 1
        }
    };

    it('sets the message newMessages state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    newMessages: [],
                    data: [],
                    messageDeleteSuccessMessage: "Message deleted",
                    total: 0
                },
            },
            {
                type: AUTHORISE_SET,
                payload: {
                    jwToken: "test"
                }
            }
        ];

        store.dispatch(
            handleMessageDeleteSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});