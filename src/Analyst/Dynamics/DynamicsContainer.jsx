import React from "react";
import Dynamics from "./Dynamics";
import { connect } from "react-redux";
import {
  getInds,
  getDynValues,
  getGoals,
  getTransportTypes,
  setGoalId,
  // setSearchQuery,
  setTransportTypeId,
  getFrequencies,
  setFrequencyId,
  getYears,
  getQuarters,
  setYear,
  setQuarterId,
  setScenarioId,
  getScenarios,
} from "@/_reducers/dynamics-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class DynamicsContainer extends React.Component {
  componentDidMount() {
    this.props.getGoals();
    this.props.getTransportTypes();
    this.props.getInds();
    this.props.getFrequencies();
    this.props.getYears();
    this.props.getQuarters();
    this.props.getScenarios();
    // if (indId) {
    //   this.props.getIndValues(indId, this.props.frequencyId);
    //   //debugger;
    // }
  }

  componentDidUpdate(prevProps) {
    // let indId = this.props.match.params.indId;
    // if (indId !== prevProps.match.params.indId) {
    //   if (indId) {
    //     this.props.getIndValues(indId, this.props.frequencyId);
    //     // debugger;
    //   }
    // }
  }

  onFilterChanged = (frequencyId) => {
    let indId = this.props.match.params.indId;
    if (indId) {
      this.props.getDynValues(indId, frequencyId);
    }
  };

  render() {
    return (
      <div>
        <Dynamics dynamicsPage={this.props} onFilterChanged={this.onFilterChanged} />;
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    inds: state.dynamicsPage.inds,
    dynVals: state.dynamicsPage.dynVals,
    checkedindsId: state.dynamicsPage.checkedindsId,
    goals: state.dynamicsPage.goals,
    transportTypes: state.dynamicsPage.transportTypes,
    isFetchingInds: state.dynamicsPage.isFetchingInds,
    isFetchingDynData: state.dynamicsPage.isFetchingDynData,
    goalId: state.dynamicsPage.goalId,
    searchQuery: state.dynamicsPage.searchQuery,
    transportTypeId: state.dynamicsPage.transportTypeId,
    frequencies: state.dynamicsPage.frequencies,
    frequencyDynId: state.dynamicsPage.frequencyDynId,
    quarterId: state.dynamicsPage.quarterId,
    quarters: state.dynamicsPage.quarters,
    year: state.dynamicsPage.year,
    years: state.dynamicsPage.years,
    scenarios: state.dynamicsPage.scenarios,
    scenarioId: state.dynamicsPage.scenarioId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getInds,
    getDynValues,
    getGoals,
    getTransportTypes,
    setGoalId,
    //setSearchQuery,
    setTransportTypeId,
    getFrequencies,
    setFrequencyId,
    getYears,
    getQuarters,
    setYear,
    setQuarterId,
    getScenarios,
    setScenarioId,
  }),
  withRouter
)(DynamicsContainer);
