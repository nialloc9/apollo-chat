import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Image } from '../../Common/Styled/Image';
import Block from '../../Common/Styled/Block';
import { remCalc } from '../../../common/helpers';

class Avatar extends PureComponent {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    render() {
        const {
            avatar,
            name
        } = this.props;

        return (
            <Block margin={`${remCalc(20)} auto`}>
                <Image width={remCalc(30)} src={avatar} avatar />
                <span>{name}</span>
            </Block>
        )
    }
}

export default Avatar;