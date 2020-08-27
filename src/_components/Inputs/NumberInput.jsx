import React from "react";
import PropTypes from 'prop-types';
import {MDBInput} from "mdbreact";

const NumberInput = (props) => {
    return (
        <MDBInput label={props.label}
                  value={props.value}
                  name={props.name}
                  type="number"
                  outline
                  onChange={props.onChange}
                  required={props.required}>
        </MDBInput>
    )
}

NumberInput.propsTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool
}

export default NumberInput;
