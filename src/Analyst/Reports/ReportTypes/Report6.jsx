import React, { Fragment } from "react";
import { MDBCol, MDBRow } from "mdbreact";
import SelectInput from "../../../_components/Inputs/SelectInput";
import NumberInput from "../../../_components/Inputs/NumberInput";
import PropTypes from "prop-types";

const Report6 = (props) => {
  const scenarioList = props.scenarios.map((item) => {
    return { value: item.code, text: item.name, checked: false };
  });

  const strategiesList = props.strategies.map((item) => {
    if (item.actual) {
      return { value: item.code, text: item.name, checked: true };
    } else {
      return { value: item.code, text: item.name, checked: false };
    }
  });

  
  return (
    <Fragment>
      <MDBRow>
        <MDBCol>
          <SelectInput
            options={scenarioList}
            getValue={props.setScenario}
            searchLabel="Поиск по сценариям"
            selected="Выберите сценарий"
            id="scenariosSelect"
            label="Наименование сценария"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <SelectInput
            options={strategiesList}
            getValue={props.setStrategy}
            searchLabel="Поиск по стратегиям"
            selected="Выберите стратегию"
            id="strategiesSelect"
            label="Наименование стратегии"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <NumberInput onChange={props.onChange} required name="start" label="Отчетный год" value={props.start} />
        </MDBCol>
      </MDBRow>
    </Fragment>
  );
};

Report6.propTypes = {
  onChange: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  strategies: PropTypes.array.isRequired,
  setStrategy: PropTypes.func.isRequired,
  scenarios: PropTypes.array.isRequired,
  setScenario: PropTypes.func.isRequired,
};

export default Report6;
