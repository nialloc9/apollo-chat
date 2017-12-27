import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu as SemanticMenu } from "semantic-ui-react";
import { withRouter } from 'react-router-dom';
import { Menu, Item } from '../Styled/Menu';
import { Logo } from '../Styled/Image';
import SoftLink from "../Styled/SoftLink";
import Button from "../Styled/Button";
import Confirmation from "../Confirmation";
import { THEME_COLOR } from "../../../common/style";
import logo from '../../../static/images/logo/logoBackgroundWhiteSquare.png';
import { authorizedLinks } from './options';
import { remCalc } from '../../../common/helpers';

class Nav extends Component {
    static propTypes = {
        active: PropTypes.string,
        logoutModalOpen: PropTypes.bool.isRequired,
        onSetLogout: PropTypes.func.isRequired,
        onSetLogoutModalOpen: PropTypes.func.isRequired,
        onResetLogout: PropTypes.func.isRequired,
    };

    mobileItems;

    state = {
        active: "",
        openMenu: false,
    };

    componentWillMount(){

        const { active, onSetLogoutModalOpen } = this.props;

        let mobileItems = [];

        this.state.openMenu && authorizedLinks.map(o => {

            const { isActive, text, to } = o;

            mobileItems.push(
                <Item
                    textColor={active === isActive ? THEME_COLOR : 'white'}
                    cursor="pointer"
                    display="none"
                    mobileDisplay="block"
                    key={text}
                >
                    <SoftLink to={to}>{text}</SoftLink>
                </Item>
            );
        });

        mobileItems.push(
            <Item
            cursor="pointer"
            display="none"
            mobileDisplay="inline"
            key="MobileHeaderItem-logout"
            onClick={onSetLogoutModalOpen}
            >
                Logout
            </Item>
        );

        this.mobileItems;
    };

    menuOnClick = () => {
        this.setState({
            openMenu: !this.state.openMenu
        })
    };

    onLogoClick = () => {
        const { history } = this.props;

        history.push('/m')
    };

    render() {
        const {
            active,
            logoutModalOpen,
            onSetLogout,
            onSetLogoutModalOpen,
            onResetLogout
        } = this.props;

        return [
            <Menu
                tabular
                stackable
                borderless
                backgroundColor={THEME_COLOR}
                fontSize={16}
                mobileDisplay="block"
                mobileHeight={remCalc(80)}
                key="navMenu"
            >
                <Item
                    padding={`${remCalc(6)}`}
                    margin={`0 ${remCalc(20)} 0 ${remCalc(15)}`}
                >
                    <SoftLink to="/main">
                        <Logo
                            src={logo}
                            size="tiny"
                            shape="circular"
                            alt="Company logo"
                            onClick={this.onLogoClick}
                        />
                    </SoftLink>
                    <Button
                        top={-40}
                        floated="right"
                        display="none"
                        mobileDisplay="inline"
                        margin="0 0 0 50%"
                        onClick={this.menuOnClick}
                    >
                        Menu
                    </Button>
                </Item>

                {authorizedLinks.map(o => {

                    const { isActive, text, to } = o;

                    return(
                        <Item
                            textColor={active === isActive ? THEME_COLOR : 'white'}
                            backgroundColor={active === isActive ? 'white' : THEME_COLOR}
                            margin="0"
                            padding={`0 ${remCalc(10)}`}
                            cursor="pointer"
                            mobileDisplay="none"
                            key={text}
                        >
                            <SoftLink to={to}>{text}</SoftLink>
                        </Item>
                    )
                })}

                {this.state.openMenu && this.mobileItems}

                <SemanticMenu.Menu position="right" >
                    <Item
                        textColor="white"
                        cursor="pointer"
                        mobileDisplay="none"
                        onClick={onSetLogoutModalOpen}
                    >
                        Logout
                    </Item>
                </SemanticMenu.Menu>
            </Menu>,
            <Confirmation
                key="navLogoutModal"
                open={logoutModalOpen}
                text="Are you sure you want to logout?"
                successButtonText="Logout"
                cancelButtonText="Cancel"
                onModalCancel={onResetLogout}
                onModalSuccess={onSetLogout}
            />
        ];
    }
}

export default withRouter(Nav);

