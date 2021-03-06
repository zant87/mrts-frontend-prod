import React from "react";
import Parameters from "./Parameters";
import { connect } from "react-redux";
import {
  getParams,
  getParamValues,
  getTransportTypes,
  setSearchQueryParams,
  setTransportTypeId,
  getFrequencies,
  setParamFrequencyId,
  getForms,
  getYears,
  getQuarters,
  setParamQuarterId,
  setCheckedFormId,
  setParamYearStart,
  setParamYearEnd,
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
        this.props.paramFrequencyId,
        this.props.paramYearStart,
        this.props.paramYearEnd,
        this.props.paramQuarterId
      );
    }
  }

  componentDidUpdate(prevProps) {
    let paramId = this.props.match.params.paramId;
    if (paramId !== prevProps.match.params.paramId) {
      if (paramId) {
        this.props.getParamValues(
          paramId,
          this.props.paramFrequencyId,
          this.props.paramYearStart,
          this.props.paramYearEnd,
          this.props.paramQuarterId
        );
      }
    }
  }

  onFilterChanged = (
    paramFrequencyId,
    yearStart,
    yearEnd,
    quarterId,
    selectedFormId
  ) => {
    this.props.getParams(selectedFormId);
    this.props.setParamFrequencyId(paramFrequencyId);
    this.props.setParamYearStart(yearStart);
    this.props.setParamYearEnd(yearEnd);
    if (quarterId != null) {
      //debugger;
      this.props.setParamQuarterId(quarterId);
    }
    let paramId = this.props.match.params.paramId;
    if (paramId) {
      this.props.getParamValues(
        paramId,
        paramFrequencyId,
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
    searchQueryParams: state.paramsPage.searchQueryParams,
    transportTypeId: state.paramsPage.transportTypeId,
    frequencies: state.paramsPage.frequencies,
    paramFrequencyId: state.paramsPage.paramFrequencyId,
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
    setSearchQueryParams,
    setTransportTypeId,
    getFrequencies,
    setParamFrequencyId,
    getForms,
    getYears,
    getQuarters,
    setParamQuarterId,
    setCheckedFormId,
    setParamYearStart,
    setParamYearEnd,
  }),
  withRouter
)(ParametersContainer);
