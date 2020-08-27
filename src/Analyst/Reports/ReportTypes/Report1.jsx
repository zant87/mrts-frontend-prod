import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {MDBCol, MDBRow} from "mdbreact";
import SelectInput from "../../../_components/Inputs/SelectInput";
import NumberInput from "../../../_components/Inputs/NumberInput";

const Report1 = (props) => {

    const quartersList = props.quarters.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    const goalsList = props.goals.map(item => {
        return {value: item.name, text: item.description, checked: false}
    });

    const scenariosList = props.scenarios.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    return (
        <Fragment>
            <MDBRow>
                <MDBCol>
                    <SelectInput options={goalsList}
                                 getValue={props.setGoal}
                                 searchLabel="Поиск по целям"
                                 selected="Выберите цель"
                                 id="goalsSelect"
                                 label="Наименование цели"/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <SelectInput options={scenariosList}
                                 getValue={props.setScenario}
                                 searchLabel="Поиск по сценариям"
                                 selected="Выберите сценарий"
                                 id="scenariosSelect"
                                 label="Наименование сценария"/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <SelectInput options={quartersList}
                                 getValue={props.setQuarter}
                                 searchLabel="Поиск по кварталам"
                                 selected="Выберите квартал"
                                 id="quartersSelect"
                                 label="Наименование квартала"/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <NumberInput onChange={props.onChange}
                                 required
                                 name="start"
                                 label="Начальный год"
                                 value={props.start}/>
                </MDBCol>
            </MDBRow>
        </Fragment>
    );
}

Report1.propTypes = {
    goals: PropTypes.array.isRequired,
    scenarios: PropTypes.array.isRequired,
    quarters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    setQuarter: PropTypes.func.isRequired,
    setScenario: PropTypes.func.isRequired,
    setGoal: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired
};

export default Report1;
