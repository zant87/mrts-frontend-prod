import React from "react";
import Parameters from "./Parameters";
import { connect } from "react-redux";
import {
  getParams,
  getParamValues,
  getTransportTypes,
  setSearchQuery,
  setTransportTypeId,
  getFrequencies,
  setFrequencyId,
  getForms,
  getYears,
  getQuarters,
  setParamQuarterId,
  setCheckedFormId,
} from "@/_reducers/params-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ParametersContainer extends React.Component {
  componentDidMount() {
    //debugger;
    this.props.getTransportTypes();
    this.props.getParams();
    this.props.getFrequencies();
    this.props.getYears();
    this.props.getQuarters();
    this.props.getForms();
    let paramId = this.props.match.params.paramId;

    if (paramId) {
      this.props.getParamValues(
        paramId,
        this.props.frequencyId,
        this.props.paramYearStart,
        this.props.paramYearEnd,
        this.props.quarterId
      );
    }
  }

  componentDidUpdate(prevProps) {
    let paramId = this.props.match.params.paramId;
    if (paramId !== prevProps.match.params.paramId) {
      if (paramId) {
        this.props.getParamValues(
          paramId,
          this.props.frequencyId,
          this.props.paramYearStart,
          this.props.paramYearEnd,
          this.props.quarterId
        );
      }
    }
  }

  onFilterChanged = (
    frequencyId,
    yearStart,
    yearEnd,
    quarterId,
    selectedFormId
  ) => {
    this.props.getParams(selectedFormId);
    let paramId = this.props.match.params.paramId;
    if (paramId) {
      this.props.getParamValues(
        paramId,
        frequencyId,
        yearStart,
        yearEnd,
        quarterId
      );
    }
  };

  render() {
    return (
      <div>
        <Parameters
          paramsPage={this.props}
          onFilterChanged={this.onFilterChanged}
        />
        ;
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    params: state.paramsPage.params,
    paramVals: state.paramsPage.paramVals,
    paramId: state.paramsPage.paramId,
    transportTypes: state.paramsPage.transportTypes,
    isFetchingParams: state.paramsPage.isFetchingParams,
    isFetchingParamData: state.paramsPage.isFetchingParamData,
    isFetchingParamInfo: state.paramsPage.isFetchingParamInfo,
    searchQuery: state.paramsPage.searchQuery,
    transportTypeId: state.paramsPage.transportTypeId,
    frequencies: state.paramsPage.frequencies,
    frequencyId: state.paramsPage.frequencyId,
    forms: state.paramsPage.forms,
    checkedFormId: state.paramsPage.checkedFormId,
    quarters: state.paramsPage.quarters,
    paramQuarterId: state.paramsPage.paramQuarterId,
    years: state.paramsPage.years,
    paramYearStart: state.paramsPage.paramYearStart,
    paramYearEnd: state.paramsPage.paramYearEnd,
  };
};

export default compose(
  connect(mapStateToProps, {
    getParams,
    getParamValues,
    getTransportTypes,
    setSearchQuery,
    setTransportTypeId,
    getFrequencies,
    setFrequencyId,
    getForms,
    getYears,
    getQuarters,
    setParamQuarterId,
    setCheckedFormId,
  }),
  withRouter
)(ParametersContainer);
