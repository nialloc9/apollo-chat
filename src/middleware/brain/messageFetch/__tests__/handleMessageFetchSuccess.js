import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageFetchSuccess from '../handleMessageFetchSuccess';
import { MESSAGE_SET } from '../../../../constants/message';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageFetchSuccess action', () => {

    global.Math.round = () => "test";

    const storeState = {
        message: {
            roomRef: 1,
            data: [],
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
            messages: [
                {
                    messageRef: 1
                }
            ],
            total: 1
        }
    };

    it('sets the message newMessages state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    messageFetchSuccessMessage: "Message sent",
                    data: [
                        {
                            messageRef: 1
                        }
                    ],
                    offset: 1,
                    total: 1
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
            handleMessageFetchSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});