import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import Styled from "styled-components";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import moment from "moment";
import Label from "./Label";
import Error from "./Error";
import Warning from "./Warning";
import { remCalc } from "../../../common/helpers";

import "react-datepicker/dist/react-datepicker.css";

const SemanticField = Form.Field;

export const Field = Styled(SemanticField)`
    float: left;  
`;

const Wrapper = Styled("div")`
    width: 100% !important;
    
    .react-datepicker-wrapper{
        width: 100% !important;
        
        .react-datepicker__input-container{
            width: 100% !important;
            
            :input {
                height: ${remCalc(37)} !important;
            }
        }
    }
`;
class DatePicker extends PureComponent {
    static propTypes = {
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        size: PropTypes.string,
    };

    render() {
        const {
            label,
            meta,
            dateFormat = "DD/MM/YYYY",
            input,
            ...rest
        } = this.props;

        const { value, ...otherInputs } = input;

        const valueProps = value ? { selected: moment(value) } : {};

        return (
            <Field>
                <Label inputLabel={label} />
                <br />
                <Wrapper>
                    <ReactDatePicker
                        {...valueProps}
                        value={value}
                        dateFormat={dateFormat}
                        {...otherInputs}
                        {...rest}
                    />
                </Wrapper>
                <Error {...meta} />
                <Warning {...meta} />
            </Field>
        );
    }
}

export default DatePicker;
