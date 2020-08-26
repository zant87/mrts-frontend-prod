import React from "react";
import PropTypes from 'prop-types';
import {MDBInput} from "mdbreact";

const BooleanInput = (props) => {
    return (
        <MDBInput
            type="checkbox"
            // id={props.value}
            id='labelingInput'
            name={props.name}
            label={props.label}
            onClick={props.onChange}>
        </MDBInput>
    )
}

BooleanInput.propsTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default BooleanInput;
