import React, {Fragment} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import SelectInput from "../../../_components/Inputs/SelectInput";
import BooleanInput from "../../../_components/Inputs/BooleanInput";
import PropTypes from "prop-types";

const Report7 = (props) => {

    const scenariosList = props.scenarios.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    const stagesList = props.stages.map(item => {
        return {value: item.code, text: item.name, checked: false}
    });

    return (
        <Fragment>
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
                    <BooleanInput onChange={props.onCheckboxChange}
                                  label='Подписи значений рядов данных'
                                  id='checkboxInput'
                                  name='labeling'/>
                </MDBCol>
            </MDBRow>
        </Fragment>
    );
}

Report7.propTypes = {
    stages: PropTypes.array.isRequired,
    setStage: PropTypes.func.isRequired,
    scenarios: PropTypes.array.isRequired,
    setScenario: PropTypes.func.isRequired,
    onCheckboxChange: PropTypes.func.isRequired
};

export default Report7;
