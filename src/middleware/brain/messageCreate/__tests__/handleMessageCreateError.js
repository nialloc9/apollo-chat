import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleMessageCreateError from '../handleMessageCreateError';
import { MESSAGE_SET } from '../../../../constants/message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleMessageCreateError action', () => {
    const storeState = {};

    const store = mockStore(storeState);

    const error = {
        errorMessage: "participant does not exist in room"
    };

    it('sets the message messageCreateErrorMessage state', () => {
        const expectedActions = [
            {
                type: MESSAGE_SET,
                payload: {
                    messageCreateErrorMessage: 'You are not a participant in this room',
                    messageCreateLoading: false,
                    messageCreateError: error
                },
            },
        ];

        store.dispatch(
            handleMessageCreateError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});