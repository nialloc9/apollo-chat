import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Embed } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignUp from './SignUp';
import Block from '../Common/Styled/Block';
import { Image } from '../Common/Styled/Image';
import Header from '../Common/Styled/Header';
import StatisticGroup from '../Common/Styled/StatisticGroup';
import { remCalc } from '../../common/helpers';
import { setSignUp, resetSignUp } from '../../actions/signUp';
import { setModal } from '../../actions/login';
import { fetchStats } from '../../actions/stat';
import hero from '../../static/images/gadget/gadget-2142920.jpg';
import tabletHero from '../../static/images/gadget/gadget-2142920_1280.jpg';
import logo from '../../static/images/logo/logoBackgroundWhiteSquare.png';
import withParticipants from '../../static/images/apollo/withParticipants.png';

class LandingPage extends Component {
    static propTypes = {
        loginModalOpen: PropTypes.bool.isRequired,
        userCount: PropTypes.bool.isRequired,
        roomCount: PropTypes.bool.isRequired,
        messageCount: PropTypes.bool.isRequired,
        signUpErrorMessage: PropTypes.string.isRequired,
        signUpSuccessMessage: PropTypes.string.isRequired,
        onSetSignUp: PropTypes.func.isRequired,
        onResetSignUp: PropTypes.func.isRequired,
        onSetLoginModal: PropTypes.func.isRequired,
        onFetchStats: PropTypes.func.isRequired,
    };

    componentWillMount(){
        const { onFetchStats } = this.props;
        onFetchStats();
    }
    handleLoginClick = () => {
        const { loginModalOpen, onSetLoginModal } = this.props;
        onSetLoginModal(!loginModalOpen);
    };

    render() {
        const {
            userCount,
            messageCount,
            roomCount,
            signUpErrorMessage,
            signUpSuccessMessage,
            onSetSignUp,
            onResetSignUp
        } = this.props;

        const items = [
            { label: 'Users', value: userCount },
            { label: 'Messages', value: messageCount },
            { label: 'Rooms', value: roomCount },
        ];

        return (
            <Grid centered stackable>
                <Grid.Row>
                    <Block
                        backgroundImage={hero}
                        backgroundImageHorizontalTablet={tabletHero}
                        backgroundImageMobile={tabletHero}
                        width="100%"
                        height={remCalc(700)}
                        backgroundPosition="65% 80%"
                        backgroundPositionHorizontalTablet="50% 200%"
                        backgroundPositionMobile="50% 200%"
                        padding={`${remCalc(220)} 0 0 0`}
                    >
                        <SignUp
                            signUpErrorMessage={signUpErrorMessage}
                            signUpSuccessMessage={signUpSuccessMessage}
                            onSetSignUp={onSetSignUp}
                            onResetSignUp={onResetSignUp}
                            onLoginClick={this.handleLoginClick}
                        />
                    </Block>
                </Grid.Row>
                <Grid.Row>
                    <Block
                        margin={`${remCalc(70)} auto 0 auto`}
                        mobileWidth="80%"
                    >
                        <Block  textAlign="center"><Header as="h2">For those who love to chat.</Header></Block>
                        <Block textAlign="center" margin={`auto auto auto ${remCalc(25)}`}><StatisticGroup items={items} /></Block>
                    </Block>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Block width="80%" margin={`${remCalc(70)} auto 0 auto`}>
                            <Image
                                size="tiny"
                                maxWidth="80%"
                                src={withParticipants}
                            />
                        </Block>
                    </Grid.Column>
                    <Grid.Column>
                        <Block width="80%" margin={`${remCalc(70)} auto 0 auto`}>
                            <Embed
                                id='O6Xo21L0ybE'
                                placeholder={logo}
                                source='youtube'
                            />
                        </Block>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

/**
 * @param form
 * @param ownProps
 * @returns {{reduxForm: *}}
 */
const mapStateToProps = ({
                             login: {
                                 modalOpen: loginModalOpen
                             },
                             signUp: {
                                 errorMessage: signUpErrorMessage,
                                 successMessage: signUpSuccessMessage
                             },
                             stat: {
                                 user: userCount,
                                 room: roomCount,
                                 message: messageCount
                             },
                             form
                         }, ownProps) => ({
    loginModalOpen,
    signUpErrorMessage,
    signUpSuccessMessage,
    userCount,
    roomCount,
    messageCount,
    reduxForm: form
});

/**
 * @param dispatch
 */
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSetSignUp: setSignUp,
            onResetSignUp: resetSignUp,
            onSetLoginModal: setModal,
            onFetchStats: fetchStats
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);