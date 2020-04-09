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
} from "@/_reducers/params-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ParametersContainer extends React.Component {
  componentDidMount() {
    //debugger;
    this.props.getTransportTypes();
    this.props.getParams();
    this.props.getFrequencies();
    let paramId = this.props.match.params.paramId;

    if (paramId) {
      this.props.getParamValues(paramId, this.props.frequencyId);
    }
  }

  componentDidUpdate(prevProps) {
    let paramId = this.props.match.params.paramId;
    if (paramId !== prevProps.match.params.paramId) {
      if (paramId) {
        this.props.getParamValues(paramId, this.props.frequencyId);
      }
    }
  }

  onFilterChanged = (frequencyId) => {
    let paramId = this.props.match.params.paramId;
    if (paramId) {
      this.props.getParamValues(paramId, frequencyId);
    }
  };

  render() {
    return (
      <div>
        <Parameters paramsPage={this.props} onFilterChanged={this.onFilterChanged} />;
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
  }),
  withRouter
)(ParametersContainer);
