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
  MDBInput
} from "mdbreact";
import { NavLink } from "react-router-dom";
// import indsstyle from "./../Indicators.module.css";
import "./../Indicators.module.css";
import IndsSettings from "../IndsSettings/IndsSettings";
import Preloader from "@/Common/Preloader/Preloader";
import { render } from "react-dom";
//import "../Indicators.module.css";

class IndsList extends React.Component {
  //let inds = props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));
  state = {
    modal: false,
    radio: 2
  };

  setFrequency = React.createRef();
  setYearStart = React.createRef();
  setYearEnd = React.createRef();

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  };

  onSaveFilters = () => {
    let freq = this.setFrequency.current.value;
    //debugger;
    // this.props.setFrequencyId(freq);
    this.props.onFilterChanged(freq);
    this.toggle();
  };

  render() {
    let inds = null;

    inds = this.props.inds.sort((a, b) => (a.code > b.code ? 1 : -1));

    if (this.props.goalId !== null) {
      inds = inds.filter(x => x.goalId == this.props.goalId);
    }

    if (this.props.transportTypeId != "0") {
      inds = inds.filter(x => x.transportTypeId == this.props.transportTypeId);
    }

    if (this.props.searchQuery != null) {
      inds = inds.filter(x =>
        x.name
          .trim()
          .toLowerCase()
          .includes(this.props.searchQuery.trim().toLowerCase())
      );
    }

    return (
      <MDBCol lg="3" className="list h-100" style={{ marginBottom: "10px" }}>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
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
                    ? this.props.frequencies.map(item =>
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
                  {this.props.frequencies
                    ? this.props.frequencies.map(item =>
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
                  {this.props.frequencies
                    ? this.props.frequencies.map(item =>
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
              ) : (
                // <div className={indsstyle.indslist}>
                <div className="indslist">
                  <div className="list-group">
                    {inds.map(ind => (
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
              )}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default IndsList;
