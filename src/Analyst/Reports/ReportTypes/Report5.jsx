import React, {Fragment} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import NumberInput from "../../../_components/Inputs/NumberInput";
import BooleanInput from "../../../_components/Inputs/BooleanInput";
import PropTypes from "prop-types";
import Report4 from "./Report4";

const Report5 = (props) => {
    return (
        <Fragment>
            <MDBRow>
                <MDBCol>
                    <NumberInput onChange={props.onChange}
                                 required
                                 name="start"
                                 label="Начальный год"
                                 value={props.start}/>
                </MDBCol>
            </MDBRow>
            <MDBRow middle between>
                <MDBCol>
                    <BooleanInput onChange={props.onCheckboxChange}
                                  label='Подписи значений рядов данных'
                                  id='checkboxInput'
                                  name='labeling'/>
                </MDBCol>
            </MDBRow>
        </Fragment>
    );
}

Report5.propTypes = {
    onChange: PropTypes.func.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired
};

export default Report5;
