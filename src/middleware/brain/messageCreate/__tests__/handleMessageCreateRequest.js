import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageCreateRequest from '../handleMessageCreateRequest';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageCreateRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test", userRef: 1
        },
        message: {
            roomRef: 1
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
        message: "test"
    };

    it('sets the messageCreateLoading state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    messageCreateLoading: true
                },
            },
        ];

        store.dispatch(
            handleMessageCreateRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});