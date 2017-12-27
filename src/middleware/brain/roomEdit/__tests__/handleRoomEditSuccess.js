import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import handleRoomEditSuccess from '../handleRoomEditSuccess';
import { ROOM_SET } from '../../../../constants/room';
import { AUTHORISE_SET } from '../../../../constants/authorise';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleRoomEditSuccess action', () => {

    const storeState = {
        room: {
            data: [{
                roomRef: 1,
                editRoomLoading: true
            }]
        }
    };

    const store = mockStore(storeState);

    const response = {
        data: {
            jwToken: "test",
            roomRef: 1
        }
    };

    it('sets the room data editRoomLoading state', () => {
        const expectedActions = [
            {
                type: ROOM_SET,
                payload: {
                    editRoomErrorMessage: "",
                    data: [{
                        roomRef: 1,
                        editRoomLoading: false
                    }]
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
            handleRoomEditSuccess(response)
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
});