import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu as SemanticMenu } from "semantic-ui-react";
import { withRouter } from 'react-router-dom';
import { Menu, Item } from '../Styled/Menu';
import { Logo } from '../Styled/Image';
import SoftLink from "../Styled/SoftLink";
import Button from "../Styled/Button";
import Login from '../Login';
import { THEME_COLOR } from "../../../common/style";
import logo from '../../../static/images/logo/logoBackgroundWhiteSquare.png';
import { links } from './options';
import { remCalc } from '../../../common/helpers';

class OpenNav extends Component {
    static propTypes = {
        active: PropTypes.string,
        loginModalOpen: PropTypes.bool.isRequired,
        onSetLogin: PropTypes.bool.isRequired,
        onLoginClick: PropTypes.bool.isRequired
    };

    mobileItems;

    state = {
        active: "",
        openMenu: false
    };

    componentWillMount(){

        const { active, onLoginClick } = this.props;

        let mobileItems = [];

        this.state.openMenu && links.map(o => {

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
            onClick={onLoginClick}
            >
                Login
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

        history.push('/landingPage')
    };

    render() {
        const {
            active,
            onLoginClick
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
                key="nav-menu"
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

                {links.map(o => {

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
                        onClick={onLoginClick}
                    >
                        Login
                    </Item>
                </SemanticMenu.Menu>
            </Menu>,
            <Login key="openNavLogin"/>
        ];
    }
}

export default withRouter(OpenNav);

