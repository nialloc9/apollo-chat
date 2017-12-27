import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageDeleteError from '../handleMessageDeleteError';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageDeleteError action', () => {
    const storeState = {
        message: {
            data: [{
                deleteMessageLoading: true
            }],
            newMessages: [{
                deleteMessageLoading: true
            }]
        }
    };

    const store = mockStore(storeState);

    const error = {
        errorMessage: "test"
    };

    it('sets the message handleMessageDeleteError state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    data: [{
                        deleteMessageLoading: false
                    }],
                    newMessages: [{
                        deleteMessageLoading: false
                    }]
                }
            },
            {
                type: MESSAGE_SET,
                payload: {
                    messageDeleteErrorMessage: 'An error has occurred',
                    messageDeleteError: error
                },
            },
        ];

        store.dispatch(
            handleMessageDeleteError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});