import React, { Fragment } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBSelect,
  MDBToastContainer,
  MDBRow,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import budlevstyle from "./../BudgetLevels.module.css";
//import IndsSettings from "../IndsSettings/IndsSettings";
import Preloader from "@/Common/Preloader/Preloader";
import budlev from "./BudgetLevelsSettings.module.css";
import { render } from "react-dom";

class BudgetLevelsSettings extends React.Component {
  //let inds = props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));
  // state = {
  //   selectIndId: null,
  // };

  selectedFundingIdRef = React.createRef();
  selectedYearStartRef = React.createRef();
  selectedYearEndRef = React.createRef();
  selectedIndIdRef = React.createRef();
  selectedScenarioRef = React.createRef();

  // toggle = () => {
  //   this.setState({
  //     modal: !this.state.modal,
  //   });
  // };

  // onClick = (nr) => () => {
  //   this.setState({
  //     radio: nr,
  //   });
  // };

  onSelectGoal = (e) => {
    let goalId = e.target.value;
    this.props.setGoalId(goalId);
  };

  onSelectTransportType = (e) => {
    let transportTypeID = e.target.value;
    this.props.setTransportTypeId(transportTypeID);
  };

  onSelectScenario = (e) => {
    let scenarioId = e.target.value;
    this.props.setScenarioId(scenarioId);
  };

  onSelectIndId = (e) => {
    //debugger;
    let selectIndId = e[0];
    this.props.setCheckedIndId(selectIndId);
    //debugger;
  };

  onSaveFilters = () => {
    let fundingId = this.selectedFundingIdRef.current.value;
    let yearStart = this.selectedYearStartRef.current.value;
    let yearEnd = this.selectedYearEndRef.current.value;
    let scenarioId = this.selectedScenarioRef.current.value;
    let selectedIndId = this.selectedIndIdRef.current.state.selectValue[0].toString();
    //debugger;

    if (selectedIndId) {
      this.props.getBudLevValues(selectedIndId, fundingId, scenarioId, yearStart, yearEnd);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    let goals = null;
    let transportTypes = null;
    let years = null;
    let scenarios = null;
    let fundings = null;
    let checkedIndId = null;

    if (this.props.goals) {
      goals = this.props.goals.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.props.transportTypes) {
      transportTypes = this.props.transportTypes.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.props.years) {
      years = this.props.years.sort();
    }

    if (this.props.fundings) {
      fundings = this.props.fundings.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.props.checkedIndId) {
      checkedIndId = this.props.checkedIndId;
      //debugger;
      console.log(checkedIndId);
    }

    let inds = null;

    //inds = this.props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));

    inds = this.props.inds.sort((a, b) => (a.code.replace("IND_", "") > b.code.replace("IND_", "") ? 1 : -1));

    if (this.props.goalId !== null) {
      inds = inds.filter((x) => x.goalId == this.props.goalId);
    }
    else {
      inds = null;
      if (this.props.goals) {
        //debugger;
        if (this.props.goals.length > 0) {
      let goalId = this.props.goals.sort((a, b) => (a.code > b.code ? 1 : -1))[0].id;
      //debugger;
      this.props.setGoalId(goalId);
        }
      }
    }

    if (this.props.transportTypeId != "0") {
      inds = inds.filter((x) => x.transportTypeId == this.props.transportTypeId);
    }

    return (
      <MDBCol lg="3" className="list h-100" style={{ marginBottom: "10px" }}>
        <MDBCard style={{ width: "100%" }}>
          <MDBCardHeader color="special-color">
            Ресурсное обеспечение и уровни достижения
            <MDBPopover placement="bottom" clickable id="popper" domElement popover>
              <div className="special-color mt-1 float-right">
                <MDBIcon
                  //onClick={this.toggle}
                  icon="question-circle"
                  size="1x"
                  //className="special-color mt-1 float-right"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                />
              </div>
              <div>
                <MDBPopoverHeader>
                  <span style={{ color: "#000000" }}>Справка</span>
                </MDBPopoverHeader>
                <MDBPopoverBody>
                  <span
                    style={{
                      color: "#000000",
                      textAlign: "justify",
                      fontSize: "14px",
                    }}
                  >
                    График «Ресурсное обеспечение и уровни достижения» позволяет произвести сравнение годовых значений уровня достижения индикаторов
                    (по базовому или инновационному сценарию) по отношению к значениям уровней ресурсного обеспечения по выбранному источнику
                    финансирования за выбранный период времени.
                  </span>
                </MDBPopoverBody>
              </div>
            </MDBPopover>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Задайте параметры отчета</MDBCardTitle>
            <MDBContainer>
              <MDBRow>
                <MDBCol size="6" style={{ padding: "7px" }}>
                  <div style={{}}>
                    <select onChange={this.onSelectGoal} className="browser-default custom-select custom-select-md ">
                      {this.props.goals
                        ? goals.map((item) =>
                            item.id == this.props.goalId ? (
                              <option value={item.id} selected>
                                {item.name}
                              </option>
                            ) : (
                              <option value={item.id}>{item.name}</option>
                            )
                          )
                        : null}
                    </select>
                  </div>
                </MDBCol>
                <MDBCol size="6" style={{ padding: "7px" }}>
                  <div style={{}}>
                    <select onChange={this.onSelectTransportType} className="browser-default custom-select custom-select-md">
                      <option value="0">Все виды транспорта</option>
                      {this.props.transportTypes
                        ? transportTypes.map((item) =>
                            item.id == this.props.transportTypeId ? (
                              <option value={item.id} selected>
                                {item.name}
                              </option>
                            ) : (
                              <option value={item.id}>{item.name}</option>
                            )
                          )
                        : null}
                    </select>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <hr />
            {/* <div className="form-group">
              <label htmlFor="scenarioform">
                <strong>Выберите индикатор</strong>
              </label>
              <select
                ref={this.selectedIndIdRef}
                //onChange={this.onSelectScenario}
                className="form-control"
                id="scenarioform"
                className="browser-default custom-select custom-select-md"
                style={{ width: "200px" }}
              >
                {this.props.inds
                  ? inds.map((item) =>
                      this.props.scenarioId == item.id ? (
                        <option value={item.id} selected>
                          {item.code.replace("IND_", "") + " " + item.name}
                        </option>
                      ) : (
                        <option value={item.id}>{item.code.replace("IND_", "") + " " + item.name}</option>
                      )
                    )
                  : null}
              </select>
            </div> */}
            {/* <form className="needs-validation"> */}
            <form className="needs-validation" onSubmit={this.submitHandler}>
              {this.props.isFetchingInds ? (
                <Preloader />
              ) : this.props.checkedIndId ? (
                <div style={{ marginBottom: "20px", clear: "left" }}>
                  <label htmlFor="scenarioform">
                    <strong>Выберите индикатор</strong>
                  </label>
                  {inds!= null && inds.length>0 ? (
                  <MDBSelect
                    required
                    ref={this.selectedIndIdRef}
                    //getValue={this.onSelectIndId}
                    //className="sel"
                    style={{ marginTop: "10px", color: "#cecece" }}
                    color="primary"
                    //color="blue-grey-select"
                    label="Выберите индикатор"
                    labelClass={budlev.sel}
                    outline="true"
                    //multiple="false"
                    search
                    searchLabel="Поиск по индикаторам"
                    options={inds.map((ind) => ({
                      text: ind.code.replace("IND_", "") + " " + ind.name,
                      value: ind.id,
                      checked: this.props.checkedIndId == ind.id ? 2 : 0,
                    }))}
                  /> ) : ( <div> Нет данных </div>) }
                </div>
              ) : (
                false
              )}

              <div className="form-group">
                <label htmlFor="scenarioform">
                  <strong>Выберите сценарий</strong>
                </label>
                <select
                  ref={this.selectedScenarioRef}
                  onChange={this.onSelectScenario}
                  className="form-control"
                  id="scenarioform"
                  className="browser-default custom-select custom-select-md"
                >
                  {this.props.scenarios
                    ? this.props.scenarios.map((item) =>
                        this.props.scenarioId == item.id ? (
                          <option value={item.id} selected>
                            {item.description}
                          </option>
                        ) : (
                          <option value={item.id}>{item.description}</option>
                        )
                      )
                    : null}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fundingform">
                  <strong>Выберите источник финансирования</strong>
                </label>
                <select
                  //onChange={this.onSelectFrequency}
                  ref={this.selectedFundingIdRef}
                  className="form-control"
                  id="fundingform"
                  className="browser-default custom-select custom-select-md"
                >
                  {this.props.fundings
                    ? this.props.fundings.map((item) =>
                        this.props.fundingId == item.id ? (
                          <option value={item.id} selected>
                            {item.name}
                          </option>
                        ) : (
                          <option value={item.id}>{item.name}</option>
                        )
                      )
                    : null}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="yearform">
                  <strong>Задайте начало интервала</strong>
                </label>
                <select
                  ref={this.selectedYearStartRef}
                  className="form-control"
                  id="yearForm"
                  className="browser-default custom-select custom-select-md"
                >
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.yearStart == item.year ? (
                          <option value={item.year} selected>
                            {item.year}
                          </option>
                        ) : (
                          <option value={item.year}>{item.year}</option>
                        )
                      )
                    : null}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="yearform">
                  <strong>Задайте конец интервала</strong>
                </label>
                <select
                  ref={this.selectedYearEndRef}
                  className="form-control"
                  id="yearForm"
                  className="browser-default custom-select custom-select-md"
                >
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.yearEnd == item.year ? (
                          <option value={item.year} selected>
                            {item.year}
                          </option>
                        ) : (
                          <option value={item.year}>{item.year}</option>
                        )
                      )
                    : null}
                </select>
              </div>
              <MDBBtn color="primary" onClick={this.onSaveFilters} type="submit">
                Построить отчет
              </MDBBtn>
            </form>
            <MDBCardText></MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default BudgetLevelsSettings;
