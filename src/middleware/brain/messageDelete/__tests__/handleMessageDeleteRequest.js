import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageDeleteRequest from '../handleMessageDeleteRequest';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageDeleteRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test", userRef: 1
        },
        message: {
            data: [{
                messageRef: 1,
                deleteMessageLoading: false
            }],
            newMessages: [{
                messageRef: 1,
                deleteMessageLoading: false
            }]
        },
        participant: {
            data: [
                {
                    userRef: 1,
                    username: "test",
                    avatar: "test"
                }
            ]
        },
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

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        messageRef: 1
    };

    it('sets the deleteMessageLoading state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    data: [
                        {
                            messageRef: 1,
                            deleteMessageLoading: true
                        }
                    ],
                    newMessages: [
                        {
                            messageRef: 1,
                            deleteMessageLoading: true
                        }
                    ]
                },
            },
        ];

        store.dispatch(
            handleMessageDeleteRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});