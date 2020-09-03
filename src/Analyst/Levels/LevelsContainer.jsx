import React from "react";
import Levels from "./Levels";
import { connect } from "react-redux";
import {
  getInds,
  getLevValues,
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
  setLevQuarterId,
  setScenarioId,
  getScenarios,
  
} from "@/_reducers/levels-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class LevelsContainer extends React.Component {
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

  // onFilterChanged = (frequencyId) => {
  //   let indId = this.props.match.params.indId;
  //   if (indId) {
  //     this.props.getDynValues(indId, frequencyId);
  //   }
  // };

  render() {
    return (
      <div>
        <Levels
          levelsPage={this.props}
          onFilterChanged={this.onFilterChanged}
        />
        ;
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    inds: state.levelsPage.inds,
    levVals: state.levelsPage.levVals,
    checkedindsId: state.levelsPage.checkedindsId,
    goals: state.levelsPage.goals,
    transportTypes: state.levelsPage.transportTypes,
    isFetchingInds: state.levelsPage.isFetchingInds,
    isFetchingLevData: state.levelsPage.isFetchingLevData,
    goalId: state.levelsPage.goalId,
    searchQuery: state.levelsPage.searchQuery,
    transportTypeId: state.levelsPage.transportTypeId,
    frequencies: state.levelsPage.frequencies,
    frequencyLevId: state.levelsPage.frequencyLevId,
    levQuarterId: state.levelsPage.levQuarterId,
    quarters: state.levelsPage.quarters,
    year: state.levelsPage.year,
    years: state.levelsPage.years,
    scenarios: state.levelsPage.scenarios,
    scenarioId: state.levelsPage.scenarioId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getInds,
    getLevValues,
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
    setLevQuarterId,
    getScenarios,
    setScenarioId,
  }),
  withRouter
)(LevelsContainer);
