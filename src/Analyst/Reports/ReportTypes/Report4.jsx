import React, {Fragment} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import NumberInput from "../../../_components/Inputs/NumberInput";
import PropTypes from "prop-types";
import BooleanInput from "../../../_components/Inputs/BooleanInput";

const Report4 = (props) => {
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
            <MDBRow>
                <MDBCol>
                    <NumberInput onChange={props.onChange}
                                 required
                                 name="end"
                                 label="Конечный год"
                                 value={props.end}/>
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

Report4.propTypes = {
    onChange: PropTypes.func.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
};

export default Report4;
