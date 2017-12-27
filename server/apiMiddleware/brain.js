import log from '../utils/log';
import createRoom from "../services/room/createRoom";
import getUserRoomsOnUserRef from "../services/room/getUserRoomsOnUserRef";
import getRoomOnRoomPin from "../services/room/getRoomOnRoomPin";
import updateRoomOnRoomRef from "../services/room/updateRoomOnRoomRef";
import deleteRoomOnRoomRef from "../services/room/deleteRoomOnRoomRef";
import deleteParticipantOnRoomRefAndUserRef from "../services/participant/deleteParticipantOnRoomRefAndUserRef";
import getParticipantsOnRoomRef from "../services/participant/getParticipantsOnRoomRef";
import getParticipantOnUserRefAndRoomRef from "../services/participant/getParticipantOnUserRefAndRoomRef";
import createParticipant from "../services/participant/createParticipant";
import createMessage from "../services/message/createMessage";
import deleteMessageOnRoomRefAndMessageRef from "../services/message/deleteMessageOnRoomRefAndMessageRef";
import getMessagesOnRoomRefAndUserRef from "../services/message/getMessagesOnRoomRefAndUserRef";
import getUserOnUserRef from "../services/user/getUserOnUserRef";

import {
    ROOM_CREATE,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_ERROR,
    ROOM_USER_FETCH,
    ROOM_USER_FETCH_SUCCESS,
    ROOM_USER_FETCH_ERROR,
    ROOM_DELETE,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_ERROR,
    ROOM_JOIN,
    ROOM_JOIN_SUCCESS,
    ROOM_JOIN_ERROR,
    ROOM_LEAVE,
    ROOM_LEAVE_SUCCESS,
    ROOM_LEAVE_ERROR,
    ROOM_EDIT,
    ROOM_EDIT_SUCCESS,
    ROOM_EDIT_ERROR,

    ROOM_PARTICIPANT_JOIN,
    ROOM_PARTICIPANT_DESTROY,
    ROOM_PARTICIPANT_LEAVE,
    ROOM_PARTICIPANT_UPDATE
} from '../constants/room';

import {
    MESSAGE_CREATE,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_ERROR,
    MESSAGE_FETCH,
    MESSAGE_FETCH_SUCCESS,
    MESSAGE_FETCH_ERROR,
    MESSAGE_DELETE,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_DELETE_ERROR,

    MESSAGE_PARTICIPANT_CREATE,
    MESSAGE_PARTICIPANT_DELETE
} from '../constants/message';

import {
    PARTICIPANT_FETCH,
    PARTICIPANT_FETCH_SUCCESS,
    PARTICIPANT_FETCH_ERROR
} from '../constants/participant';

import { BRAIN_DISCONNECT } from '../constants/brain';

import requiredParam from '../utils/requiredParam';
import jwtVerify from '../utils/jwtVerify';

const brain = (socket) => {

    /**
     * create room
     * @param roomName
     * @param expire
     * @param userRef
     * @param jwToken
     */
    socket.on(ROOM_CREATE, async ({roomName, expire, username, userRef, jwToken}) => {
        try {
            requiredParam({serviceName: ROOM_CREATE, paramName: "roomName", param: roomName});
            requiredParam({serviceName: ROOM_CREATE, paramName: "expire", param: expire});
            requiredParam({serviceName: ROOM_CREATE, paramName: "username", param: username});
            requiredParam({serviceName: ROOM_CREATE, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_CREATE, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: ROOM_CREATE, message: "waiting" });

            const result = await createRoom({ roomName, expire, username, userRef });

            const { data: { roomRef } }= result;

            // join room
            socket.join(roomRef, () => {
                log({
                    level: 'info',
                    title: 'SOCKET',
                    message: `joined room ${roomRef}`,
                });
            });

            socket.emit(ROOM_CREATE_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_CREATE, message });
            socket.emit(ROOM_CREATE_ERROR, { errorMessage: message } );
        }
    });

    /**
     * join room
     * @param roomPin
     * @param username
     * @param userRef
     * @param jwToken
     */
    socket.on(ROOM_JOIN, async ({roomPin, username, userRef, jwToken}) => {
        try {
            requiredParam({serviceName: ROOM_JOIN, paramName: "roomPin", param: roomPin});
            requiredParam({serviceName: ROOM_JOIN, paramName: "username", param: username});
            requiredParam({serviceName: ROOM_JOIN, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_JOIN, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: ROOM_JOIN, message: "waiting" });

            const room = await getRoomOnRoomPin({ roomPin, userRef });

            const { data: { room: { roomRef} } } = room;

            const result = await createParticipant({ roomRef, username, userRef });

            // join room
            socket.join(roomRef);

            const user = await getUserOnUserRef(userRef);

            const avatar = user.data.user.avatar;

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_JOIN, { userRef, username, roomRef, avatar });

            log({
                level: 'info',
                title: 'SOCKET',
                message: `joined room ${roomRef}`,
            });

            socket.emit(ROOM_JOIN_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_JOIN, message });
            socket.emit(ROOM_JOIN_ERROR, { errorMessage: message } );
        }
    });

    /**
     * fetches a users rooms using the their userRef
     * @param userRef
     * @param jwToken
     */
    socket.on(ROOM_USER_FETCH, async ({ userRef, jwToken}) => {

        try {
            requiredParam({serviceName: ROOM_USER_FETCH, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_USER_FETCH, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: ROOM_USER_FETCH, message: "waiting" });

            const result = await getUserRoomsOnUserRef({ userRef });

            const { data: { rooms } } = result;

            // join rooms
            rooms.map(o => {
                socket.join(o.roomRef, () => {
                    log({
                        level: 'info',
                        title: 'SOCKET',
                        message: `joined room ${o.roomRef}`,
                    });
                });
            });

            socket.emit(ROOM_USER_FETCH_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_USER_FETCH, message });

            socket.emit(ROOM_USER_FETCH_ERROR, { errorMessage: message });
        }
    });

    /**
     * deletes a room using the roomRef
     * @param roomRef
     * @param userRef
     * @param jwToken
     */
    socket.on(ROOM_DELETE, async ({roomRef, userRef, jwToken}) => {

        try {
            requiredParam({serviceName: ROOM_DELETE, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: ROOM_DELETE, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_DELETE, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: ROOM_DELETE, message: "waiting" });

            const result = await deleteRoomOnRoomRef({ roomRef, userRef });

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_DESTROY, { userRef, roomRef });

            // leave socket
            socket.leave(roomRef, () => {
                log({
                    level: 'info',
                    title: 'SOCKET',
                    message: `left room ${roomRef}`,
                });
            });

            socket.emit(ROOM_DELETE_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_DELETE, message });
            socket.emit(ROOM_DELETE_ERROR, { errorMessage: message });
        }
    });

    /**
     * deletes a participant using the roomRef and userRef
     * @param roomRef
     * @param username
     * @param userRef
     * @param jwToken
     */
    socket.on(ROOM_LEAVE, async payload => {

        const { roomRef, userRef } = payload;
        const token = payload.jwToken;

        try {
            requiredParam({serviceName: ROOM_LEAVE, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: ROOM_LEAVE, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_LEAVE, paramName: "jwToken", param: token});

            jwtVerify(token);

            log({ level: 'info', title: ROOM_LEAVE, message: "waiting" });

            const participant = await getParticipantOnUserRefAndRoomRef({ userRef, roomRef });
            const result = await deleteParticipantOnRoomRefAndUserRef({ roomRef, userRef });

            const { data: { jwToken, ...rest }} = participant;

            // leave socket
            socket.leave(roomRef, () => {
                log({
                    level: 'info',
                    title: 'SOCKET',
                    message: `user: ${userRef} left room ${roomRef}`,
                });
            });

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_LEAVE, rest);

            socket.emit(ROOM_LEAVE_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_DELETE, message });
            socket.emit(ROOM_LEAVE_ERROR, { errorMessage: message });
        }
    });

    /**
     * updates a room using the room ref and userRef
     * @param roomRef
     * @param userRef
     * @param roomName
     * @param jwToken
     */
    socket.on(ROOM_EDIT, async ({roomRef, userRef, roomName, expire, jwToken}) => {

        try {
            requiredParam({serviceName: ROOM_EDIT, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: ROOM_EDIT, paramName: "userRef", param: userRef});
            requiredParam({serviceName: ROOM_EDIT, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: ROOM_EDIT, message: "waiting" });

            const result = await updateRoomOnRoomRef({ roomRef, userRef, roomName, expire });

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_UPDATE, { userRef, roomName, roomRef });

            socket.emit(ROOM_EDIT_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: ROOM_EDIT, message });
            socket.emit(ROOM_EDIT_ERROR, { errorMessage: message });
        }
    });

    /**
     * create message
     * @param roomRef
     * @param message
     * @param userRef
     * @param jwToken
     */
    socket.on(MESSAGE_CREATE, async payload => {

        const {roomRef, message, username, roomName, avatar, userRef} = payload;

        const token = payload.jwToken;

        try {
            requiredParam({serviceName: MESSAGE_CREATE, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: MESSAGE_CREATE, paramName: "message", param: message});
            requiredParam({serviceName: MESSAGE_CREATE, paramName: "userRef", param: userRef});
            requiredParam({serviceName: MESSAGE_CREATE, paramName: "jwToken", param: token});

            jwtVerify(token);

            log({ level: 'info', title: MESSAGE_CREATE, message: "waiting" });

            const result = await createMessage({ roomRef, userRef, message });

            const { data: { jwToken, ...rest } } = result;

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(MESSAGE_PARTICIPANT_CREATE, { roomName, message: { avatar, username, ...rest } });

            socket.emit(MESSAGE_CREATE_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: MESSAGE_CREATE, message });
            socket.emit(MESSAGE_CREATE_ERROR, { errorMessage: message } );
        }
    });

    /**
     * deletes a message from the database
     * @param messageRef
     * @param roomRef
     * @param message
     * @param userRef
     */
    socket.on(MESSAGE_DELETE, async ({messageRef, roomRef, userRef, jwToken}) => {
        try {
            requiredParam({serviceName: MESSAGE_DELETE, paramName: "messageRef", param: messageRef});
            requiredParam({serviceName: MESSAGE_DELETE, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: MESSAGE_DELETE, paramName: "userRef", param: userRef});
            requiredParam({serviceName: MESSAGE_DELETE, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: MESSAGE_DELETE, message: "waiting" });

            const result = await deleteMessageOnRoomRefAndMessageRef({ messageRef, roomRef, userRef });

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(MESSAGE_PARTICIPANT_DELETE, { messageRef });

            socket.emit(MESSAGE_DELETE_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: MESSAGE_DELETE, message });
            socket.emit(MESSAGE_DELETE_ERROR, { errorMessage: message } );
        }
    });

    /**
     * fetches messages from the database
     * @param roomRef
     * @param message
     * @param userRef
     */
    socket.on(MESSAGE_FETCH, async ({roomRef, userRef, jwToken, limit, offset}) => {
        try {
            requiredParam({serviceName: MESSAGE_FETCH, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: MESSAGE_FETCH, paramName: "userRef", param: userRef});
            requiredParam({serviceName: MESSAGE_FETCH, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: MESSAGE_FETCH, message: "waiting" });

            const result = await getMessagesOnRoomRefAndUserRef({ roomRef, userRef, limit, offset });

            const participant = await await getParticipantOnUserRefAndRoomRef({ userRef, roomRef });

            const { data: { username } } = participant;

            const user = await getUserOnUserRef(userRef);

            const { data: { user: { avatar } } } = user;

            // Fire to everyone but you
            socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_JOIN, { userRef, username, roomRef, avatar });

            socket.emit(MESSAGE_FETCH_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: MESSAGE_FETCH, message });
            socket.emit(MESSAGE_FETCH_ERROR, { errorMessage: message } );
        }
    });

    /**
     * fetches participants from the database
     * @param roomRef
     * @param message
     * @param userRef
     */
    socket.on(PARTICIPANT_FETCH, async ({roomRef, userRef, jwToken, limit, offset}) => {
        try {
            requiredParam({serviceName: PARTICIPANT_FETCH, paramName: "roomRef", param: roomRef});
            requiredParam({serviceName: PARTICIPANT_FETCH, paramName: "userRef", param: userRef});
            requiredParam({serviceName: PARTICIPANT_FETCH, paramName: "jwToken", param: jwToken});

            jwtVerify(jwToken);

            log({ level: 'info', title: PARTICIPANT_FETCH, message: "waiting" });

            const result = await getParticipantsOnRoomRef({ roomRef, userRef, limit, offset });

            socket.emit(PARTICIPANT_FETCH_SUCCESS, result);

        } catch ({ message }) {
            log({ level: 'error', title: PARTICIPANT_FETCH, message });
            socket.emit(PARTICIPANT_FETCH_ERROR, { errorMessage: message } );
        }
    });

    /**
     * disconnects the server from the client
     */
    socket.on(BRAIN_DISCONNECT, async ({ roomRef, userRef }) => {

        if(roomRef && userRef){
            const participant = await getParticipantOnUserRefAndRoomRef({ userRef, roomRef });

            const { data: { jwToken, ...rest }} = participant;

            // leave socket
            socket.leave(roomRef, () => {
                log({
                    level: 'info',
                    title: 'SOCKET',
                    message: `user: ${userRef} left room ${roomRef}`,
                });
            });
        }

        // Fire to everyone but you
        socket.broadcast.to(roomRef).emit(ROOM_PARTICIPANT_LEAVE, rest);

        socket.disconnect();
    })
};

export default brain;