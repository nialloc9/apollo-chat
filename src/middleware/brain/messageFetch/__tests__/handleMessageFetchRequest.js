import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageFetchRequest from '../handleMessageFetchRequest';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageFetchRequest action', () => {
    const storeState = {
        authorise: {
            jwToken: "test",
            userRef: 1
        },
        message: {
            offset: 0
        }
    };

    const store = mockStore(storeState);

    const socket = {
        emit: jest.fn()
    };

    const payload = {
        roomRef: 1
    };

    it('sets the roomRef state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    roomRef: 1,
                }
            }
        ];

        store.dispatch(
            handleMessageFetchRequest({
                socket,
                payload
            }),
        );

        expect(store.getActions()).toEqual(expectedActions);

        expect(socket.emit).toHaveBeenCalled();
    });
});