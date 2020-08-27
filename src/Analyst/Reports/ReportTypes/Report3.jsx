import React, {Fragment} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import NumberInput from "../../../_components/Inputs/NumberInput";
import PropTypes from "prop-types";

const Report3 = (props) => {
    return (
        <MDBRow>
            <MDBCol>
                <NumberInput onChange={props.onChange}
                             required
                             name="start"
                             label="Начальный год"
                             value={props.start}/>
            </MDBCol>
        </MDBRow>
    );
}

Report3.propTypes = {
    onChange: PropTypes.func.isRequired,
    setQuarter: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired
};


export default Report3;
