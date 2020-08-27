import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {MDBCol, MDBRow} from "mdbreact";
import SelectInput from "../../../_components/Inputs/SelectInput";

const Report8 = (props) => {

    const scenariosList = props.scenarios.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    const stagesList = props.stages.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    const strategiesList = props.strategies.map(item => {
        return {value: item.code, text: item.code, checked: false}
    });


    return (
        <Fragment>
            <MDBRow>
                <MDBCol>
                    <SelectInput options={strategiesList}
                                 getValue={props.setStrategy}
                                 searchLabel="Поиск по стратегиям"
                                 selected="Выберите стратегию"
                                 id="strategiesSelect"
                                 label="Наименование стратегии"/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <SelectInput options={stagesList}
                                 getValue={props.setStage}
                                 searchLabel="Поиск по этапам ТС"
                                 selected="Выберите этап ТС"
                                 id="stagesSelect"
                                 label="Наименование этапа ТС"/>
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
        </Fragment>
    );
}

Report8.propTypes = {
    stages: PropTypes.array.isRequired,
    setStage: PropTypes.func.isRequired,
    scenarios: PropTypes.array.isRequired,
    setScenario: PropTypes.func.isRequired,
    strategies: PropTypes.array.isRequired,
    setStrategy: PropTypes.func.isRequired,
};

export default Report8;
