import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleParticipantFetchError from '../handleParticipantFetchError';
import { PARTICIPANT_SET } from '../../../../constants/participant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleParticipantFetchError action', () => {
    const storeState = {};

    const store = mockStore(storeState);

    const error = {
        errorMessage: "participant does not exist in room"
    };

    it('sets the message participantErrorMessage state', () => {
        const expectedActions = [
            {
                type: PARTICIPANT_SET,
                payload: {
                    participantErrorMessage: 'You are not a participant in this room',
                    participantError: error
                }
            }
        ];

        store.dispatch(
            handleParticipantFetchError(error),
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});