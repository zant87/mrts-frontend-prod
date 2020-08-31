import React, {Fragment} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import SelectInput from "../../../_components/Inputs/SelectInput";
import NumberInput from "../../../_components/Inputs/NumberInput";
import PropTypes from "prop-types";

const Report2 = (props) => {

    const quartersList = props.quarters.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    return (
        <Fragment>
            <Fragment>
                <MDBRow>
                    <MDBCol>
                        <SelectInput options={quartersList}
                                     getValue={props.setQuarter}
                                     searchLabel="Поиск по кварталам"
                                     selected="Выберите квартал"
                                     id="quartersSelect"
                                     label="Отчетный квартал"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <NumberInput onChange={props.onChange}
                                     required
                                     name="start"
                                     label="Отчетный год"
                                     value={props.start}/>
                    </MDBCol>
                </MDBRow>
            </Fragment>
        </Fragment>
    );
}

Report2.propTypes = {
    quarters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    setQuarter: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired
};

export default Report2;
