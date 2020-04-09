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
import paramsstyle from "./../Parameters.module.css";
import ParamsSettings from "../ParamsSettings/ParamsSettings";
import Preloader from "@/Common/Preloader/Preloader";
import { render } from "react-dom";

class ParamsList extends React.Component {
  state = {
    modal: false,
    radio: 2,
  };

  setFrequency = React.createRef();
  setYearStart = React.createRef();
  setYearEnd = React.createRef();

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

  onSaveFilters = () => {
    let freq = this.setFrequency.current.value;
    this.props.onFilterChanged(freq);
    this.toggle();
  };

  render() {
    let params = null;

    params = this.props.params.sort((a, b) => (a.id > b.id ? 1 : -1));

    // if (this.props.transportTypeId != "0") {
    //   params = params.filter(x => x.transportTypeId == this.props.transportTypeId);
    // }

    if (this.props.searchQuery != null) {
      params = params.filter((x) => x.parameterName.trim().toLowerCase().includes(this.props.searchQuery.trim().toLowerCase()));
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
        </MDBModal>

        <MDBCard style={{ width: "100%" }}>
          <MDBCardHeader color="special-color">
            Показатели
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
            <ParamsSettings
              transportTypes={this.props.transportTypes}
              setSearchQuery={this.props.setSearchQuery}
              searchQuery={this.props.searchQuery}
              transportTypeId={this.props.transportTypeId}
              setTransportTypeId={this.props.setTransportTypeId}
            />
            <MDBCardTitle>Выберите показатель</MDBCardTitle>
            <MDBCardText>
              {this.props.isFetchingParams ? (
                <Preloader />
              ) : (
                <div className={paramsstyle.paramslist}>
                  <div className="list-group">
                    {params.map((param) => (
                      <NavLink
                        exact
                        to={"/analyst/parameters/" + param.id}
                        key={param.id}
                        activeClassName="active"
                        className="list-group-item list-group-item-action text-justify"
                      >
                        {param.id + ". " + param.parameterName}
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

export default ParamsList;
