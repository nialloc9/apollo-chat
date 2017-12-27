import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageCreateSuccess from '../handleMessageCreateSuccess';
import { MESSAGE_SET } from '../../../../constants/message';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageCreateSuccess action', () => {

    global.Math.round = () => "test";

    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        message: {
            roomRef: 1,
            newMessages: []
        },
        participant: {
            data: [
                {
                    userRef: 1,
                    username: "test",
                    avatar: "test"
                }
            ]
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            data: [
                {
                    test: "test"
                }
            ]
        }
    };

    it('sets the message newMessages state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    newMessages: [
                        {
                            data: [
                                {
                                    test: "test"
                                }
                            ],
                            avatar: "test",
                            username: "test",
                            createdAt: "test"
                }
                    ],
                    messageCreateLoading: false
                },
            },
            {
                type: "@@redux-form/RESET",
                meta: {
                    form: "sendMessageForm",
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
            handleMessageCreateSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});