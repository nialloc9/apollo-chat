import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Block from '../../Common/Styled/Block';
import Avatar from './Avatar';
import avatars from '../avatars';
import { remCalc } from '../../../common/helpers';
import { CUTTY_SARK } from '../../../common/style';

class Participants extends Component {
    static propTypes = {
        participantTotal: PropTypes.number.isRequired,
        participantData: PropTypes.array
    };

    static defaultProps = {
        participantData: []
    };

    render() {
        const {
            participantData
        } = this.props;

        return (
            <Block
                margin={`${remCalc(30)} ${remCalc(100)}`}
                width="30%"
                mobileMargin="auto auto"
                mobileWidth="100%"
                border={`${remCalc(1)} solid ${CUTTY_SARK}`}
                borderRadius={`${remCalc(50)}`}
                padding={`${remCalc(20)} ${remCalc(50)}`}
                maxHeight={remCalc(750)}
            >
                <Block
                    maxHeight={remCalc(600)}
                    overflow="auto"
                >
                    {
                        participantData.map((o, i) => <Avatar key={`participant-${o.participantRef}`} name={o.username} avatar={avatars[o.avatar]} />)
                    }
                </Block>
            </Block>
        )
    }
}

export default Participants;