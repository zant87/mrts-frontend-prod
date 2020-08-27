import React from "react";
import PropTypes from 'prop-types';
import {MDBInput} from "mdbreact";

const StringInput = (props) => {
    return (
        <MDBInput label={props.label}
                  value={props.value}
                  name={props.name}
                  type="text"
                  outline
                  onChange={props.onChange}
                  required={props.required}>
        </MDBInput>
    )
}

StringInput.propsTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool
}

export default StringInput;
