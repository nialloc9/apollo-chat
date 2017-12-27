import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageFetchError from '../handleMessageFetchError';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageFetchError action', () => {
    const storeState = {};

    const store = mockStore(storeState);

    const error = {
        errorMessage: "could not find user messages"
    };

    it('sets the message messageFetchErrorMessage state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    messageFetchErrorMessage: 'Oh looks like this room is shy. Be the first to chat below.',
                    messageFetchError: error
                }
            }
        ];

        store.dispatch(
            handleMessageFetchError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});