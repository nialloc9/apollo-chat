import {
    USER_ROOM_CREATE_REQUEST,
    USER_ROOM_FETCH_REQUEST,
    USER_ROOM_JOIN_REQUEST,
    USER_ROOM_DELETE_REQUEST,
    USER_ROOM_LEAVE_REQUEST,
    USER_ROOM_EDIT_REQUEST,
    USER_PARTICIPANT_FETCH_REQUEST,
} from '../../constants/room';

import { BRAIN_INIT_REQUEST, BRAIN_DISCONNECT_REQUEST } from '../../constants/brain';

import {
    USER_MESSAGE_CREATE_REQUEST,
    USER_MESSAGE_FETCH_REQUEST,
    USER_MESSAGE_DELETE_REQUEST
} from '../../constants/message';

import {
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_ERROR,
    ROOM_USER_FETCH_SUCCESS,
    ROOM_USER_FETCH_ERROR,
    ROOM_JOIN_SUCCESS,
    ROOM_JOIN_ERROR,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_ERROR,
    ROOM_LEAVE_SUCCESS,
    ROOM_LEAVE_ERROR,
    ROOM_EDIT_SUCCESS,
    ROOM_EDIT_ERROR,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_ERROR,
    MESSAGE_FETCH_SUCCESS,
    MESSAGE_FETCH_ERROR,
    PARTICIPANT_FETCH_SUCCESS,
    PARTICIPANT_FETCH_ERROR,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_DELETE_ERROR,
    ROOM_PARTICIPANT_JOIN,
    ROOM_PARTICIPANT_DESTROY,
    ROOM_PARTICIPANT_LEAVE,
    ROOM_PARTICIPANT_UPDATE,
    MESSAGE_PARTICIPANT_CREATE
} from '../../constants/socket';

import initializeSocket from './initializeSocket';
import brainDisconnect from './brainDisconnect';
import handleRoomCreateSuccess from './roomCreate/handleRoomCreateSuccess';
import handleRoomCreateError from './roomCreate/handleRoomCreateError';
import handleRoomCreateRequest from './roomCreate/handleRoomCreateRequest';
import handleRoomFetchRequest from './roomFetch/handleRoomFetchRequest';
import handleRoomFetchSuccess from './roomFetch/handleRoomFetchSuccess';
import handleRoomFetchError from './roomFetch/handleRoomFetchError';
import handleRoomJoinRequest from './roomJoin/handleRoomJoinRequest';
import handleRoomJoinSuccess from './roomJoin/handleRoomJoinSuccess';
import handleRoomJoinError from './roomJoin/handleRoomJoinError';
import handleRoomDeleteRequest from './roomDelete/handleRoomDeleteRequest';
import handleRoomDeleteSuccess from './roomDelete/handleRoomDeleteSuccess';
import handleRoomDeleteError from './roomDelete/handleRoomDeleteError';
import handleRoomLeaveRequest from './roomLeave/handleRoomLeaveRequest';
import handleRoomLeaveSuccess from './roomLeave/handleRoomLeaveSuccess';
import handleRoomLeaveError from './roomLeave/handleRoomLeaveError';
import handleRoomEditRequest from './roomEdit/handleRoomEditRequest';
import handleRoomEditSuccess from './roomEdit/handleRoomEditSuccess';
import handleRoomEditError from './roomEdit/handleRoomEditError';
import handleMessageCreateRequest from './messageCreate/handleMessageCreateRequest';
import handleMessageCreateSuccess from './messageCreate/handleMessageCreateSuccess';
import handleMessageCreateError from './messageCreate/handleMessageCreateError';
import handleMessageFetchRequest from './messageFetch/handleMessageFetchRequest';
import handleMessageFetchSuccess from './messageFetch/handleMessageFetchSuccess';
import handleMessageFetchError from './messageFetch/handleMessageFetchError';
import handleMessageDeleteRequest from './messageDelete/handleMessageDeleteRequest';
import handleMessageDeleteSuccess from './messageDelete/handleMessageDeleteSuccess';
import handleMessageDeleteError from './messageDelete/handleMessageDeleteError';
import handleParticipantFetchRequest from './participantFetch/handleParticipantFetchRequest';
import handleParticipantFetchSuccess from './participantFetch/handleParticipantFetchSuccess';
import handleParticipantFetchError from './participantFetch/handleParticipantFetchError';
import handleRoomParticipantJoin from './roomParticipant/handleRoomParticipantJoin';
import handleRoomParticipantDestroy from './roomParticipant/handleRoomParticipantDestroy';
import handleRoomParticipantLeave from './roomParticipant/handleRoomParticipantLeave';
import handleRoomParticipantUpdate from './roomParticipant/handleRoomParticipantUpdate';
import handleMessageParticipantCreate from './messageParticipant/handleMessageParticipantCreate';

let socket = null;

/**
 * @param dispatch
 * @param getState
 * @constructor
 */
const brain = ({ dispatch, getState }) => next => action => {
    const { type, payload } = action;

    switch (type) {

        case BRAIN_INIT_REQUEST:
            if(!socket){

                socket = initializeSocket();

                socket.on(ROOM_CREATE_SUCCESS, (response) => {

                    dispatch(handleRoomCreateSuccess(response));

                }).on(ROOM_CREATE_ERROR, (error) => {

                    dispatch(handleRoomCreateError(error));

                }).on(ROOM_USER_FETCH_SUCCESS, (response) => {

                    dispatch(handleRoomFetchSuccess(response));

                }).on(ROOM_USER_FETCH_ERROR, (error) => {

                    dispatch(handleRoomFetchError(error));

                }).on(ROOM_JOIN_SUCCESS, (response) => {

                    dispatch(handleRoomJoinSuccess(response));

                }).on(ROOM_JOIN_ERROR, (error) => {

                    dispatch(handleRoomJoinError(error));

                }).on(ROOM_DELETE_SUCCESS, (response) => {

                    dispatch(handleRoomDeleteSuccess(response));

                }).on(ROOM_DELETE_ERROR, (error) => {

                    dispatch(handleRoomDeleteError(error));

                }).on(ROOM_LEAVE_SUCCESS, (response) => {

                    dispatch(handleRoomLeaveSuccess(response));

                }).on(ROOM_LEAVE_ERROR, (error) => {

                    dispatch(handleRoomLeaveError(error));

                }).on(ROOM_EDIT_SUCCESS, (response) => {

                    dispatch(handleRoomEditSuccess(response));

                }).on(ROOM_EDIT_ERROR, (error) => {

                    dispatch(handleRoomEditError(error));

                }).on(MESSAGE_CREATE_SUCCESS, (response) => {

                    dispatch(handleMessageCreateSuccess(response));

                }).on(MESSAGE_CREATE_ERROR, (error) => {

                    dispatch(handleMessageCreateError(error));

                }).on(MESSAGE_FETCH_SUCCESS, (response) => {

                    dispatch(handleMessageFetchSuccess(response));

                }).on(MESSAGE_FETCH_ERROR, (error) => {

                    dispatch(handleMessageFetchError(error));

                }).on(PARTICIPANT_FETCH_SUCCESS, (response) => {

                    dispatch(handleParticipantFetchSuccess(response));

                }).on(PARTICIPANT_FETCH_ERROR, (error) => {

                    dispatch(handleParticipantFetchError(error));

                }).on(MESSAGE_DELETE_SUCCESS, (response) => {

                    dispatch(handleMessageDeleteSuccess(response));

                }).on(MESSAGE_DELETE_ERROR, (error) => {

                    dispatch(handleMessageDeleteError(error));

                }).on(ROOM_PARTICIPANT_JOIN, (response) => {

                    dispatch(handleRoomParticipantJoin(response));

                }).on(ROOM_PARTICIPANT_DESTROY, (response) => {

                    dispatch(handleRoomParticipantDestroy(response));

                }).on(ROOM_PARTICIPANT_LEAVE, (response) => {

                    dispatch(handleRoomParticipantLeave(response));

                }).on(ROOM_PARTICIPANT_UPDATE, (response) => {

                    dispatch(handleRoomParticipantUpdate(response));

                }).on(MESSAGE_PARTICIPANT_CREATE, (response) => {

                    dispatch(handleMessageParticipantCreate(response));

                }).on('error', (error) => {
                    console.log(error);
                }).on('reconnect_attempt', (attempt) => {
                    if (attempt === 5) {
                        socket.disconnect();
                    }
                });
            }
            break;
        case USER_ROOM_CREATE_REQUEST:
            dispatch(handleRoomCreateRequest({ socket, payload }));
            break;
        case USER_ROOM_FETCH_REQUEST:
            dispatch(handleRoomFetchRequest(socket));
            break;
        case USER_ROOM_JOIN_REQUEST:
            dispatch(handleRoomJoinRequest({ socket, payload }));
            break;
        case USER_ROOM_DELETE_REQUEST:
            dispatch(handleRoomDeleteRequest({ socket, payload }));
            break;
        case USER_ROOM_LEAVE_REQUEST:
            dispatch(handleRoomLeaveRequest({ socket, payload }));
            break;
        case USER_ROOM_EDIT_REQUEST:
            dispatch(handleRoomEditRequest({ socket, payload }));
            break;
        case USER_MESSAGE_CREATE_REQUEST:
            dispatch(handleMessageCreateRequest({ socket, payload }));
            break;
        case USER_MESSAGE_FETCH_REQUEST:
            dispatch(handleMessageFetchRequest({ socket, payload }));
            break;
        case USER_PARTICIPANT_FETCH_REQUEST:
            dispatch(handleParticipantFetchRequest({ socket, payload }));
            break;
        case USER_MESSAGE_DELETE_REQUEST:
            dispatch(handleMessageDeleteRequest({ socket, payload }));
            break;
        case BRAIN_DISCONNECT_REQUEST:
            dispatch(brainDisconnect({ socket }));
        default:
            return next(action);
    }

    return next(action);
};

export default brain;