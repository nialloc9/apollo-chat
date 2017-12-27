import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Block from '../Common/Styled/Block';


class Error404 extends Component {
    static propTypes = {};

    render() {
        const {} = this.props;

        return (
            <Grid centered>
                <Grid.Row>
                    <Block>
                        Error 404
                    </Block>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Error404;