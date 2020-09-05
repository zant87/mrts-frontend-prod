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
import levstyle from "./../Levels.module.css";
//import IndsSettings from "../IndsSettings/IndsSettings";
import Preloader from "@/Common/Preloader/Preloader";
import lev from "./LevSettings.module.css";
import { render } from "react-dom";

class LevSettings extends React.Component {
  //let inds = props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));
  // state = {
  //   modal: false,
  //   radio: 2,
  // };

  selectedFrequencyIdRef = React.createRef();
  selectedYearRef = React.createRef();
  selectedIndsRef = React.createRef();
  selectedScenarioRef = React.createRef();
  selectedQuarterIdRef = React.createRef();

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

  onSelectFrequency = (e) => {
    let frequencyLevId = e.target.value;
    this.props.setFrequencyId(frequencyLevId);
  };

  onSelectQuarter = (e) => {
    let quarterId = e.target.value;
    this.props.setLevQuarterId(quarterId);
  };

  onSelectScenario = (e) => {
    let scenarioId = e.target.value;
    this.props.setScenarioId(scenarioId);
  };

  // onSelectedInds = (selectValue) => {
  //   alert(selectValue);
  // };

  onSaveFilters = () => {
    let frequencyLevId = this.selectedFrequencyIdRef.current.value;
    let year = this.selectedYearRef.current.value;
    let scenarioId = this.selectedScenarioRef.current.value;
    let selectedIndsArr = this.selectedIndsRef.current.state.selectValue;
    let quarter = null;
    if (frequencyLevId == 2) {
      quarter = this.selectedQuarterIdRef.current.value;
    }
    if (selectedIndsArr.length != 0) {
      this.props.getLevValues(selectedIndsArr, frequencyLevId, scenarioId, year, quarter);
    }
    //debugger;
    //alert(this.selectedIndsRef.current.state.selectValue);
    //console.log(selectedIndsArr);
    //debugger;
    // this.props.setFrequencyId(freq);
    //this.props.onFilterChanged(freq);

    //this.toggle();
  };

  submitHandler = (event) => {
    event.preventDefault();
    //event.target.className += " was-validated";
  };

  render() {
    // if (!this.props.goals || !this.props.transportTypes || !this.props.years || !this.props.quarters) {
    //   return <Preloader />;
    // }

    let goals = null;
    let transportTypes = null;
    let years = null;
    let quarters = null;
    let scenarios = null;

    if (this.props.goals) {
      goals = this.props.goals.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.props.transportTypes) {
      transportTypes = this.props.transportTypes.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.props.years) {
      years = this.props.years.sort();
    }

    if (this.props.quarters) {
      quarters = this.props.quarters.sort((a, b) => (a.name > b.name ? 1 : -1));
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

    // if (this.props.searchQuery != null) {
    //   inds = inds.filter((x) => x.name.trim().toLowerCase().includes(this.props.searchQuery.trim().toLowerCase()));
    // }

    return (
      <MDBCol lg="3" className="list h-100" style={{ marginBottom: "10px" }}>
        {/* <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>Настройка отображения данных</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer className="mt-2">
              <div className="form-group">
                <label htmlFor="freqform">
                  <strong>Выберите частоту обновления</strong>
                </label>
                <select
                  ref={this.setFrequency}
                  className="form-control"
                  id="freqform"
                  className="browser-default custom-select custom-select-sm"
                >
                  {this.props.frequencies
                    ? this.props.frequencies.map((item) =>
                        this.props.frequencyId == item.id ? (
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
              <hr />

              <div className="form-group">
                <label htmlFor="freqform">
                  <strong>Начало периода</strong>
                </label>
                <select
                  ref={this.setYearStart}
                  className="form-control"
                  id="yearStart"
                  className="browser-default custom-select custom-select-sm"
                >
                  <option value="2010">2010</option>
                </select>
                <br></br>
                <label htmlFor="freqform">
                  <strong>Конец периода</strong>
                </label>
                <select
                  ref={this.setYearEnd}
                  className="form-control"
                  id="yearEnd"
                  className="browser-default custom-select custom-select-sm"
                >
                  <option value="2010">2010</option>
                </select>
              </div>
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="special-color" onClick={this.toggle}>
              Отмена
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.onSaveFilters}>
              Сохранить
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal> */}

        <MDBCard style={{ width: "100%" }}>
          <MDBCardHeader color="special-color">
            Уровни достижения
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
                    Уровень достижения индикаторов выражается в процентном соотношении фактического значения индикатора к прогнозному (по базовому или
                    инновационному сценарию) на заданный период. Лепестковая диаграмма уровней достижения строится для выбранной цели или по выбранным
                    индикаторам.
                  </span>
                </MDBPopoverBody>
              </div>
            </MDBPopover>
            {/* <MDBIcon
              onClick={this.toggle}
              icon="filter"
              size="1x"
              className="special-color mt-1 float-right"
              style={{ cursor: "pointer", color: "#ffffff" }}
            /> */}
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Задайте параметры отчета</MDBCardTitle>
            {/* <IndsSettings
              goals={this.props.goals}
              transportTypes={this.props.transportTypes}
              setGoalId={this.props.setGoalId}
              goalId={this.props.goalId}
              setSearchQuery={this.props.setSearchQuery}
              searchQuery={this.props.searchQuery}
              transportTypeId={this.props.transportTypeId}
              setTransportTypeId={this.props.setTransportTypeId}
            /> */}
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


            <form className="needs-validation" onSubmit={this.submitHandler}>
              {this.props.isFetchingInds ? (
                <Preloader />
              ) :  (
                <div style={{ marginBottom: "20px", clear: "left" }}>
                  <label htmlFor="scenarioform">
                    <strong>Выберите индикаторы</strong>
                  </label>
                  {inds!= null && inds.length>0 ? (
                  <MDBSelect
                    required
                    ref={this.selectedIndsRef}
                    //className="sel"
                    style={{ marginTop: "10px", color: "#cecece" }}
                    color="primary"
                    //color="blue-grey-select"
                    label="Выберите индикаторы"
                    labelClass={lev.sel}
                    outline="true"
                    multiple
                    //search
                    searchLabel="Поиск индикаторов"
                    options={inds.map((ind) => ({
                      text: ind.code.replace("IND_", "") + " " + ind.name,
                      value: ind.id,
                      checked: true,
                    }))}
                    //selected="Выберите индикаторы"
                    selectAll
                    selectAllLabel="Выберите все"
                    selectAllValue=""
                    //focusShadow="inset 0px 10px 0px 0px"
                    //getValue={this.onSelectedInds}
                  /> ) : ( <div> Нет данных </div>) }
                </div>
               ) }

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
                <label htmlFor="freqform">
                  <strong>Выберите частоту обновления</strong>
                </label>
                <select
                  onChange={this.onSelectFrequency}
                  ref={this.selectedFrequencyIdRef}
                  className="form-control"
                  id="freqform"
                  className="browser-default custom-select custom-select-md"
                >
                  {this.props.frequencies
                    ? this.props.frequencies.map((item) =>
                        this.props.frequencyLevId == item.id ? (
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
                  <strong>Выберите год</strong>
                </label>
                <select ref={this.selectedYearRef} className="form-control" id="yearForm" className="browser-default custom-select custom-select-md">
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.year == item.year ? (
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
              {this.props.frequencyLevId == 2 ? (
                <div className="form-group">
                  <label htmlFor="freqform">
                    <strong>Выберите квартал</strong>
                  </label>
                  <select
                    ref={this.selectedQuarterIdRef}
                    onChange={this.onSelectQuarter}
                    className="form-control"
                    id="freqform"
                    className="browser-default custom-select custom-select-md"
                  >
                    {this.props.quarters
                      ? this.props.quarters.map((item) =>
                          this.props.levQuarterId == item.id ? (
                            <option value={item.code} selected>
                              {item.name}
                            </option>
                          ) : (
                            <option value={item.code}>{item.name}</option>
                          )
                        )
                      : null}
                  </select>
                </div>
              ) : null}
              <MDBBtn color="primary" onClick={this.onSaveFilters} type="submit">
                Построить отчет
              </MDBBtn>
            </form>
            {/* <MDBCardTitle>Выберите индикаторы</MDBCardTitle> */}
            <MDBCardText>
              {/* {this.props.isFetchingInds ? (
                <Preloader />
              ) : (
                <div>
                  <MDBSelect
                    size="3"
                    className={dyn.mdselect}
                    multiple
                    search
                    searchLabel="Поиск индикаторов"
                    options={inds.map((ind) => ({ text: ind.code.replace("IND_", "") + " " + ind.name, value: ind.id, checked: true }))}
                    selected="Выберите индикаторы"
                    selectAll
                    selectAllLabel="Выберите все"
                  />
                  <div className={dynstyle.indsliste}>
                    <div className="list-group">
                      {inds.map((ind) => (
                        <div class="custom-control custom-checkbox list-group-item list-group-item-action text-justify">
                          <input type="checkbox" class="custom-control-input" id={ind.id} />
                          <label class="custom-control-label" for={ind.id}>
                            {ind.code.replace("IND_", "") + " " + ind.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )} */}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default LevSettings;
