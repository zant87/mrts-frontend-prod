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
    paramFrequencyId: this.props.paramFrequencyId,
  };

  setFrequency = React.createRef();
  setYearStart = React.createRef();
  setYearEnd = React.createRef();
  setQuarter = React.createRef();
  paramFrequencyId = null;
  selectedFormsRef = React.createRef();
  selectedForms = [];

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
      paramFrequencyId: this.setFrequency.current.value,
    });
    //this.paramFrequencyId = e.target.value;
    //debugger;
    //this.paramFrequencyId = this.setFrequency.current.value;
    //this.props.setparamFrequencyId(paramFrequencyId);
  };

  // onSelectQuarter = (e) => {
  //   let quarterId = e.target.value;
  //   this.props.setParamQuarterId(quarterId);
  // };

  // onSelectedForms = () => {
  //   //debugger;
  //   let selectedFormsArr = this.selectedFormsRef.current.state.selectValue;
  //   //this.props.setCheckedFormId(selectedFormsArr);
  //   console.log(this.props);
  // };

  onSaveFilters = () => {
    let quarterId = null;
    let freq = this.setFrequency.current.value;
    let yearStart = this.setYearStart.current.value;
    let yearEnd = this.setYearEnd.current.value;
    let selectedFormsArr = this.selectedFormsRef.current.state.selectValue;
    //debugger;
    if (this.setQuarter.current != null) {
      //debugger;
      quarterId = this.setQuarter.current.value;
    }

    this.props.onFilterChanged(freq, yearStart, yearEnd, quarterId, selectedFormsArr);
    this.toggle();
  };

  render() {
    let params = null;
    let forms = null;
    let newForms = [];
    let search;
    let checked = null;
    let checkedForms = this.props.checkedFormId;

    params = this.props.params.sort((a, b) => (a.parameterName > b.parameterName ? 1 : -1));

    if (this.props.forms) {
      forms = this.props.forms
        .sort((a, b) => (a.okudName > b.okudName ? 1 : -1))
        .map((item) => {
          let emissCode = "";
          if (checkedForms != null) {
            checked = false;
            checkedForms.forEach((cform) => {
              if (cform.toString() == item.id.toString()) {
                checked = true;
              }
            });
          } else {
            checked = true;
          }
          if (item.okudName != null) {
            if (item.okudName == "ЕМИСС" && item.code != "") {
              if (item.code.split("FORM_EMISS_")[1]) {
                emissCode = "ИД:" + item.code.split("FORM_EMISS_")[1].split("HANDMADE")[0];
              }
            }
            return {
              text: item.okudName + ` (${item.dataProviderName}, ${emissCode})`,
              value: item.id,
              checked: checked,
            };
          }
        });
    }

    if (this.props.transportTypeId != "0") {
      params = params.filter((x) => x.transportTypeId == this.props.transportTypeId);
    }

    if (this.props.searchQuery != null) {
      params = params.filter((item) => {
        //debugger;
        if (item.parameterName != null) {
          return item.parameterName.trim().toLowerCase().includes(this.props.searchQuery.toString().trim().toLowerCase());
        }
      });
    }
    console.log(params);

    return (
      <MDBCol lg="3" className="list h-100" style={{ marginBottom: "10px" }}>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>Настройка отображения данных</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer className="mt-2">
              <div style={{ marginBottom: "20px", clear: "left" }}>
                <label htmlFor="scenarioform">
                  <strong>Статистические формы</strong>
                </label>
                <MDBSelect
                  //onChange={this.onSelectedForms}

                  ref={this.selectedFormsRef}
                  //className="sel"
                  style={{ marginTop: "10px", color: "#cecece" }}
                  color="primary"
                  //color="blue-grey-select"
                  label="Статистические формы"
                  //labelClass={lev.sel}
                  outline="true"
                  multiple
                  search
                  searchLabel="Поиск форм"
                  options={this.props.forms ? forms : null}
                  //selected="Выберите индикаторы"
                  selectAll
                  selectAllLabel="Выберите все"
                  selectAllValue=""
                  //focusShadow="inset 0px 10px 0px 0px"
                  //getValue={this.selectedForms}
                  required
                />
              </div>
              <hr />
              <div className="form-group">
                <label htmlFor="freqform">
                  <strong>Выберите частоту обновления</strong>
                </label>
                <select
                  ref={this.setFrequency}
                  onChange={this.onSelectFrequency}
                  className="form-control"
                  id="freqform"
                  className="browser-default custom-select custom-select-sm"
                >
                  {this.props.frequencies
                    ? this.props.frequencies.map((item) =>
                        this.props.paramFrequencyId == item.id ? (
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
              {this.state.paramFrequencyId == 2 ? (
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
                          this.props.paramQuarterId == item.id ? (
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
                <select ref={this.setYearStart} className="form-control" id="yearStart" className="browser-default custom-select custom-select-sm">
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.paramYearStart == item.year ? (
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
                <select ref={this.setYearEnd} className="form-control" id="yearEnd" className="browser-default custom-select custom-select-sm">
                  {this.props.years
                    ? this.props.years.map((item) =>
                        this.props.paramYearEnd == item.year ? (
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
              ) : params.length > 0 ? (
                <div className={paramsstyle.paramslist}>
                  <div className="list-group">
                    {params.map((param) => (
                      <NavLink
                        exact
                        // to={"/analyst/parameters/" + param.id}
                        to={"/analyst/parameters/" + param.id}
                        key={param.id}
                        activeClassName="active"
                        className="list-group-item list-group-item-action text-justify"
                      >
                        {/* {param.id + ". " + param.parameterName} */}
                        {param.parameterName}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                "Нет данных"
              )}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default ParamsList;
