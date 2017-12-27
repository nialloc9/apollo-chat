import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Error from './Error';
import Warning from './Warning';
import TextInput from 'semantic-ui-react/dist/commonjs/addons/TextArea';

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  size: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const TextArea = (props) => {
  const { label, meta, input, ...rest } = props;

  return (
    <div>
      <Label label={label} />
      <TextInput {...input} {...rest} />
      <Error {...meta} />
      <Warning {...meta} />
    </div>
  );
};

TextArea.propTypes = propTypes;
export default TextArea;
