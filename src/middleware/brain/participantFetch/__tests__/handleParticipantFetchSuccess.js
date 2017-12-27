import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleParticipantFetchSuccess from '../handleParticipantFetchSuccess';
import { PARTICIPANT_SET } from '../../../../constants/participant';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleParticipantFetchSuccess action', () => {

    const storeState = {
        participant: {
            data: []
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            participants: [
                {
                    participantRef: 1
                }
            ],
            total: 1
        }
    };

    it('sets the message newMessages state', () => {
        const expectedActions = [
            {
                type: PARTICIPANT_SET,
                payload: {
                    data: [
                        {
                            participantRef: 1
                        }
                    ]
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
            handleParticipantFetchSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});