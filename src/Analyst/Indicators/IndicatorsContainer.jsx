import React from "react";
import Indicators from "./Indicators";
import { connect } from "react-redux";
import {
  getInds,
  getIndValues,
  getGoals,
  getTransportTypes,
  setGoalId,
  setSearchQuery,
  setTransportTypeId,
  getFrequencies,
  setFrequencyId
} from "@/_reducers/inds-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class IndicatorsContainer extends React.Component {
  componentDidMount() {
    this.props.getGoals();
    this.props.getTransportTypes();
    this.props.getInds();
    this.props.getFrequencies();
    let indId = this.props.match.params.indId;

    if (indId) {
      this.props.getIndValues(indId, this.props.frequencyId);
      //debugger;
    }
  }

  componentDidUpdate(prevProps) {
    let indId = this.props.match.params.indId;
    if (indId !== prevProps.match.params.indId) {
      if (indId) {
        this.props.getIndValues(indId, this.props.frequencyId);
        // debugger;
      }
    }
  }

  onFilterChanged = frequencyId => {
    let indId = this.props.match.params.indId;
    if (indId) {
      this.props.getIndValues(indId, frequencyId);
    }
  };

  render() {
    return (
      <div>
        <Indicators indsPage={this.props} onFilterChanged={this.onFilterChanged} />;
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    inds: state.indsPage.inds,
    indVals: state.indsPage.indVals,
    indId: state.indsPage.indId,
    goals: state.indsPage.goals,
    transportTypes: state.indsPage.transportTypes,
    isFetchingInds: state.indsPage.isFetchingInds,
    isFetchingIndData: state.indsPage.isFetchingIndData,
    isFetchingInfo: state.indsPage.isFetchingInfo,
    goalId: state.indsPage.goalId,
    searchQuery: state.indsPage.searchQuery,
    transportTypeId: state.indsPage.transportTypeId,
    frequencies: state.indsPage.frequencies,
    frequencyId: state.indsPage.frequencyId
  };
};

export default compose(
  connect(mapStateToProps, {
    getInds,
    getIndValues,
    getGoals,
    getTransportTypes,
    setGoalId,
    setSearchQuery,
    setTransportTypeId,
    getFrequencies,
    setFrequencyId
  }),
  withRouter
)(IndicatorsContainer);
