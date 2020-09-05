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
} from "mdbreact";
import { NavLink } from "react-router-dom";
// import indsstyle from "./../Indicators.module.css";
import indsstyle from "./../Indicators.module.css";
import IndsSettings from "../IndsSettings/IndsSettings";
import Preloader from "@/Common/Preloader/Preloader";
import { render } from "react-dom";
//import "../Indicators.module.css";

class IndsList extends React.Component {
  //let inds = props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));
  state = {
    modal: false,
    radio: 2,
    indFrequencyId: this.props.indFrequencyId,
  };

  setFrequency = React.createRef();
  setYearStart = React.createRef();
  setYearEnd = React.createRef();
  setQuarter = React.createRef();
  indFrequencyId = null;

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onClick = (nr) => () => {
    this.setState({
      radio: nr,
    });
  };

  onSelectFrequency = (e) => {
    this.setState({
      indFrequencyId: this.setFrequency.current.value,
    });
  };

  
  onSaveFilters = () => {
    let quarterId = null;
    let freq = this.setFrequency.current.value;
    let yearStart = this.setYearStart.current.value;
    let yearEnd = this.setYearEnd.current.value;
    if (this.setQuarter.current != null) {
      //debugger;
      quarterId = this.setQuarter.current.value;
    }
    //debugger;
    this.props.onFilterChanged(freq, yearStart, yearEnd, quarterId);
    this.toggle();
  };

  render() {
    //console.log(indsstyle);s
    let inds = null;

    inds = this.props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));

    if (this.props.goalId !== null) {
      inds = inds.filter((x) => x.goalId == this.props.goalId);
     // debugger;
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
      inds = inds.filter(
        (x) => x.transportTypeId == this.props.transportTypeId
      );
    }

    if (this.props.searchQuery != null) {
      inds = inds.filter((x) =>
        (x.name
          .trim()
          .toLowerCase()
          .includes(this.props.searchQuery.trim().toLowerCase()) || (x.code
            .trim()
            .toLowerCase()
            .includes(this.props.searchQuery.trim().toLowerCase())))
      );
    }

    return (
      <MDBCol lg="3" className="list h-100" style={{ marginBottom: "10px" }}>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>
            Настройка отображения данных
          </MDBModalHeader>
          <MDBModalBody>
            <MDBContainer className="mt-2">
              <div className="form-group">
                <label htmlFor="freqform">
                  <strong>Выберите частоту обновления</strong>
                </label>
                <select
                  onChange={this.onSelectFrequency}
                  ref={this.setFrequency}
                  className="form-control"
                  id="freqform"
                  className="browser-default custom-select custom-select-sm"
                >
                  {this.props.frequencies
                    ? this.props.frequencies.map((item) =>
                        this.props.indFrequencyId == item.id ? (
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
              {this.state.indFrequencyId == 2 ? (
                <div className="form-group">
                  <label htmlFor="quarterform">
                    <strong>Выберите квартал</strong>
                  </label>
                  <select
                    ref={this.setQuarter}
                    onChange={this.onSelectQuarter}
                    className="form-control"
                    id="freqform"
                    className="browser-default custom-select custom-select-sm"
                  >
                    {this.props.quarters
                      ? this.props.quarters.map((item) =>
                          this.props.indsQuarterId == item.id ? (
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
              ) : null}
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
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.indsYearStart == item.year ? (
                          <option value={item.year} selected>
                            {item.year}
                          </option>
                        ) : (
                          <option value={item.year}>{item.year}</option>
                        )
                      )
                    : null}
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
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.indsYearEnd == item.year ? (
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
        </MDBModal>

        <MDBCard style={{ width: "100%" }}>
          <MDBCardHeader color="special-color">
            Индикаторы ТС
            <MDBIcon
              onClick={this.toggle}
              icon="filter"
              size="1x"
              className="special-color mt-1 float-right"
              style={{ cursor: "pointer", color: "#ffffff" }}
            />
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>Фильтры</MDBCardTitle>
            <IndsSettings
              goals={this.props.goals}
              transportTypes={this.props.transportTypes}
              setGoalId={this.props.setGoalId}
              goalId={this.props.goalId}
              setSearchQuery={this.props.setSearchQuery}
              searchQuery={this.props.searchQuery}
              transportTypeId={this.props.transportTypeId}
              setTransportTypeId={this.props.setTransportTypeId}
            />
            <MDBCardTitle>Выберите индикатор</MDBCardTitle>
            <MDBCardText>
              {this.props.isFetchingInds ? (
                <Preloader />
              ) : 

                inds!= null && inds.length>0 ? (
                <div className={indsstyle.indsliste}>
                  <div className="list-group">
                    {inds.map((ind) => (
                      <NavLink
                        exact
                        to={"/analyst/indicators/" + ind.id}
                        key={ind.id}
                        activeClassName="active"
                        className="list-group-item list-group-item-action text-justify"
                      >
                        {ind.code.replace("IND_", "") + " " + ind.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                ) : "Нет данных"
              }
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default IndsList;
