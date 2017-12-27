import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Block from '../Styled/Block';
import Button from '../Styled/Button';
import { Image } from '../Styled/Image';
import Header from '../Styled/Header';
import { remCalc } from '../../../common/helpers';
import canaryTick from '../../../static/images/tick/cuttySarkTick.png';

class MessageBox extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        buttonText: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: null,
        buttonText: "Back",
        text: "Success",
    };

    render() {
        const {onClick, text, buttonText} = this.props;

        return (
        <Block margin={`${remCalc(10)} ${remCalc(100)}`} width="50%" mobileMargin="auto auto" mobileWidth="100%">
            <Grid columns={1} stretched stackable centered>
                <Grid.Column>
                    <Block>
                        <Image width={remCalc(70)} src={canaryTick} />
                    </Block>
                    <Block textAlign="center" margin={`${remCalc(20)} auto`}>
                        <Header as="h3">{text}</Header>
                    </Block>
                    <Block textAlign="left">
                        {
                            onClick &&
                            <Button onClick={onClick}>
                                {buttonText}
                            </Button>
                        }
                    </Block>
                </Grid.Column>
            </Grid>
        </Block>
        )
    }
}

export default MessageBox;