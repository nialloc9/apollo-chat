import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Block from '../Styled/Block';
import Button from '../Styled/Button';
import { remCalc } from '../../../common/helpers';
import { CUTTY_SARK } from '../../../common/style';

export class Confirmation extends Component {
    static propTypes = {
      open: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      onModalCancel: PropTypes.func.isRequired,
      onModalSuccess: PropTypes.func.isRequired,
      successButtonText: PropTypes.string,
      cancelButtonText: PropTypes.string,
      size: PropTypes.string,
    };

    static defaultProps = {
      successButtonText: 'Yes',
      cancelButtonText: 'No',
      size: 'tiny',
    };

    render() {
      const {
        open,
        size,
        text,
        successButtonText,
        cancelButtonText,
        onModalCancel,
        onModalSuccess,
      } = this.props;

      return (
        <Modal open={open} size={size}>
          <Modal.Content>{text}</Modal.Content>
            <Modal.Actions>
                <Block width="50%" margin={`auto ${remCalc(20)} auto auto`}>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Button
                                margin={`auto auto auto ${remCalc(35)}`}
                                onClick={onModalCancel}
                            >
                                {cancelButtonText}
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button backgroundColor={CUTTY_SARK} onClick={onModalSuccess}>
                                {successButtonText}
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Block>
            </Modal.Actions>
        </Modal>
      );
    }
}

export default Confirmation;
