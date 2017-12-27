import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Block from '../Common/Styled/Block'
import Nav from '../Common/Nav';
import Rooms from './Rooms';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { remCalc } from '../../common/helpers';
import { setLogout, setModalOpen, resetLogout } from '../../actions/logout';
import {
    setRoom,
    setCreateRoomPage,
    setJoinRoomPage,
    fetchRooms,
    joinRoom,
    deleteRoom,
    leaveRoom,
    editRoom
} from '../../actions/room';

import { initBrain } from '../../actions/brain';

class MainPage extends Component {
    static propTypes = {
        createRoomLoading: PropTypes.bool.isRequired,
        joinRoomLoading: PropTypes.bool.isRequired,
        logoutModalOpen: PropTypes.bool.isRequired,
        editRoomOpen: PropTypes.bool.isRequired,

        createRoomPage: PropTypes.number.isRequired,
        joinRoomPage: PropTypes.number.isRequired,
        userRef: PropTypes.number.isRequired,

        createRoomErrorMessage: PropTypes.string.isRequired,
        joinRoomErrorMessage: PropTypes.string.isRequired,
        editRoomSuccessMessage: PropTypes.string,
        editRoomErrorMessage: PropTypes.string,
        jwToken: PropTypes.string.isRequired,

        rooms: PropTypes.array.isRequired,

        onSetLogout: PropTypes.func.isRequired,
        onSetLogoutModalOpen: PropTypes.func.isRequired,
        onResetLogout: PropTypes.func.isRequired,
        onSetRoom: PropTypes.func.isRequired,
        onInitBrain: PropTypes.func.isRequired,
        onSetCreateRoomPage: PropTypes.func.isRequired,
        onSetJoinRoomPage: PropTypes.func.isRequired,
        onFetchRooms: PropTypes.func.isRequired,
        onJoinRoom: PropTypes.func.isRequired,
        onDeleteRoom: PropTypes.func.isRequired,
        onLeaveRoom: PropTypes.func.isRequired,
        onSetEditRoom: PropTypes.func.isRequired,
        onSetEditRoomClosed: PropTypes.func.isRequired,
        onSetEditRoomValues: PropTypes.func.isRequired
    };

    componentDidMount(){
        const { onInitBrain, onFetchRooms } = this.props;
        onInitBrain();
        onFetchRooms();
    }

    render() {
        const {
            createRoomLoading,
            joinRoomLoading,
            createRoomPage,
            joinRoomPage,
            joinRoomErrorMessage,
            userRef,
            createRoomErrorMessage,
            logoutModalOpen,
            editRoomErrorMessage,
            rooms,

            onSetLogout,
            onSetLogoutModalOpen,
            onResetLogout,
            onSetRoom,
            onSetCreateRoomPage,
            onSetJoinRoomPage,
            onJoinRoom,
            onDeleteRoom,
            onLeaveRoom,
            onEditRoom
        } = this.props;

        return [
            <Nav
                key="mainpage-nav"
                logoutModalOpen={logoutModalOpen}
                onSetLogout={onSetLogout}
                onSetLogoutModalOpen={onSetLogoutModalOpen}
                onResetLogout={onResetLogout}
            />,
            <Block key="main-page-grid" margin={`${remCalc(70)} ${remCalc(70)}`} mobileMargin={`${remCalc(70)} ${remCalc(10)}`}>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Rooms
                            userRef={userRef}
                            editRoomErrorMessage={editRoomErrorMessage}
                            rooms={rooms}
                            onDeleteRoom={onDeleteRoom}
                            onLeaveRoom={onLeaveRoom}
                            onEditRoom={onEditRoom}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <CreateRoom
                            loading={createRoomLoading}
                            createRoomPage={createRoomPage}
                            errorMessage={createRoomErrorMessage}
                            onSetRoom={onSetRoom}
                            onSetCreateRoomPage={onSetCreateRoomPage}
                        />
                        <JoinRoom
                            loading={joinRoomLoading}
                            joinRoomPage={joinRoomPage}
                            errorMessage={joinRoomErrorMessage}
                            onSetJoinRoomPage={onSetJoinRoomPage}
                            onJoinRoom={onJoinRoom}
                        />
                    </Grid.Column>
                </Grid>
            </Block>
        ]
    }
}

/**
 * @param email
 * @param jwToken
 * @param userRef
 * @param data
 * @param createRoomPage
 * @param createRoomErrorMessage
 * @param createRoomLoading
 * @param joinRoomPage
 * @param joinRoomErrorMessage
 * @param joinRoomLoading
 * @param editRoomErrorMessage
 * @param logout
 * @param form
 * @param ownProps
 */
const mapStateToProps = ({
                             authorise: {
                                 email, jwToken, userRef
                             },
                             room: {
                                 data,
                                 createRoomPage,
                                 createRoomErrorMessage,
                                 createRoomLoading,
                                 joinRoomPage,
                                 joinRoomErrorMessage,
                                 joinRoomLoading,
                                 editRoomErrorMessage
                             }, logout,
                             form
                         },
                         ownProps
) => ({
    createRoomPage,
    createRoomErrorMessage,
    createRoomLoading,
    joinRoomPage,
    joinRoomErrorMessage,
    joinRoomLoading,
    editRoomErrorMessage,
    userRef,
    email,
    jwToken,
    logoutModalOpen: logout.modalOpen,
    rooms: data,
    reduxForm: form
});

/**
 * @param dispatch
 */
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSetLogout: setLogout,
            onSetLogoutModalOpen: setModalOpen,
            onResetLogout: resetLogout,
            onSetCreateRoomPage: setCreateRoomPage,
            onSetJoinRoomPage: setJoinRoomPage,
            onInitBrain: initBrain,
            onFetchRooms: fetchRooms,
            onJoinRoom: joinRoom,
            onSetRoom: setRoom,
            onDeleteRoom: deleteRoom,
            onLeaveRoom: leaveRoom,
            onEditRoom: editRoom
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);