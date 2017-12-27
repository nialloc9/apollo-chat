import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from 'semantic-ui-react';
import Block from '../Common/Styled/Block';
import Nav from '../Common/Nav/index';
import { remCalc } from '../../common/helpers';
import Participants from './Participants';
import Chat from './Chat';
import SendMessage from './SendMessage';
import { setLogout, setModalOpen, resetLogout } from '../../actions/logout';
import { setMessage, fetchMessages, deleteMessage } from '../../actions/message';
import { fetchRooms } from '../../actions/room';
import { initBrain } from '../../actions/brain';
import { fetchParticipants } from '../../actions/participant';


class RoomPage extends Component {
    static propTypes = {
        messageTotal: PropTypes.number.isRequired,
        participantTotal: PropTypes.number.isRequired,
        messageOffset: PropTypes.number.isRequired,
        userRef: PropTypes.number.isRequired,
        logoutModalOpen: PropTypes.bool.isRequired,
        messageCreateLoading: PropTypes.bool.isRequired,
        messageCreateSuccessMessage: PropTypes.string.isRequired,
        messageCreateErrorMessage: PropTypes.string.isRequired,
        messageData: PropTypes.array.isRequired,
        newMessages: PropTypes.array.isRequired,
        participantData: PropTypes.array.isRequired,
        onSetLogout: PropTypes.func.isRequired,
        onSetLogoutModalOpen: PropTypes.func.isRequired,
        onResetLogout: PropTypes.func.isRequired,
        onSetMessage: PropTypes.func.isRequired,
        onFetchMessages: PropTypes.func.isRequired,
        onDeleteMessage: PropTypes.func.isRequired,
        onFetchRooms: PropTypes.func.isRequired,
    };

    componentWillMount(){
        const { onInitBrain, onFetchRooms } = this.props;
        onInitBrain();
        this.handleFetchMessages();
        this.handleFetchParticipants();
        onFetchRooms();
    };

    handleFetchMessages = () => {
        const { match: {
            params: {
                roomRef
            }
        }, onFetchMessages } = this.props;

        onFetchMessages(roomRef);
    };

    handleFetchParticipants = () => {
        const { match: {
            params: {
                roomRef
            }
        }, onFetchParticipants } = this.props;

        onFetchParticipants(roomRef);
    };

    render() {
        const {
            logoutModalOpen,
            userRef,
            messageOffset,
            messageTotal,
            participantTotal,
            messageCreateSuccessMessage,
            messageCreateErrorMessage,
            messageCreateLoading,
            messageData,
            newMessages,
            participantData,
            onSetLogout,
            onSetLogoutModalOpen,
            onResetLogout,
            onSetMessage,
            onDeleteMessage
        } = this.props;

        return [
            <Nav
                key="room-page-nav"
                logoutModalOpen={logoutModalOpen}
                onSetLogout={onSetLogout}
                onSetLogoutModalOpen={onSetLogoutModalOpen}
                onResetLogout={onResetLogout}
            />,
            <Block
                key="room-page-grid"
                margin={`${remCalc(70)} ${remCalc(70)}`}
                mobileMargin={`${remCalc(70)} ${remCalc(10)}`}
                isReverse
            >
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Chat
                            maxHeight={640}
                            isReverse={true}
                            userRef={userRef}
                            data={messageData}
                            newMessages={newMessages}
                            total={messageTotal}
                            offset={messageOffset}
                            onLoadMore={this.handleFetchMessages}
                            onDeleteMessage={onDeleteMessage}
                        />
                        <SendMessage
                            messageCreateSuccessMessage={messageCreateSuccessMessage}
                            messageCreateErrorMessage={messageCreateErrorMessage}
                            messageCreateLoading={messageCreateLoading}
                            hasMessages={messageData.length > 0}
                            onSubmit={onSetMessage}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Participants
                            participantTotal={participantTotal}
                            participantData={participantData}
                        />
                    </Grid.Column>
                </Grid>
            </Block>
        ]
    }
}

/**
 * @param userRef
 * @param logout
 * @param messageCreateSuccessMessage
 * @param messageCreateErrorMessage
 * @param messageCreateLoading
 * @param total
 * @param offset
 * @param data
 * @param newMessages
 * @param participant
 * @param form
 * @param ownProps
 */
const mapStateToProps = ({
                             authorise: {
                                 userRef
                             },
                             logout,
                             message: {
                                 messageCreateSuccessMessage,
                                 messageCreateErrorMessage,
                                 messageCreateLoading,
                                 total,
                                 offset,
                                 data,
                                 newMessages
                             },
                             participant,
                             form
                         },
                         ownProps) => ({
    userRef,
    logoutModalOpen: logout.modalOpen,
    messageCreateSuccessMessage,
    messageCreateErrorMessage,
    messageCreateLoading,
    messageTotal: total,
    messageOffset: offset,
    messageData: data,
    newMessages,
    participantTotal: participant.total,
    participantData: participant.data,
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
            onSetMessage: setMessage,
            onFetchMessages: fetchMessages,
            onDeleteMessage: deleteMessage,
            onInitBrain: initBrain,
            onFetchParticipants: fetchParticipants,
            onFetchRooms: fetchRooms,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);