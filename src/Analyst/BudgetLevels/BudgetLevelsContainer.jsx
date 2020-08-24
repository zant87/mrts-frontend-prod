import React from "react";
import BudgetLevels from "./BudgetLevels";
import { connect } from "react-redux";
import {
  getInds,
  getBudLevValues,
  getGoals,
  getTransportTypes,
  setGoalId,
  setTransportTypeId,
  getFundings,
  setFundingId,
  getYears,
  setYearStart,
  setYearEnd,
  getScenarios,
  setScenarioId,
  setCheckedIndId,
} from "@/_reducers/budget-levels-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class BudgetLevelsContainer extends React.Component {
  componentDidMount() {
    this.props.getGoals();
    this.props.getTransportTypes();
    this.props.getInds();
    this.props.getFundings();
    this.props.getYears();
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
        <BudgetLevels budgetLevelsPage={this.props} onFilterChanged={this.onFilterChanged} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    inds: state.budgetLevelsPage.inds,
    budLevVals: state.budgetLevelsPage.budLevVals,
    checkedIndId: state.budgetLevelsPage.checkedIndId,
    goals: state.budgetLevelsPage.goals,
    transportTypes: state.budgetLevelsPage.transportTypes,
    isFetchingInds: state.budgetLevelsPage.isFetchingInds,
    isFetchingBudLevData: state.budgetLevelsPage.isFetchingBudLevData,
    goalId: state.budgetLevelsPage.goalId,
    transportTypeId: state.budgetLevelsPage.transportTypeId,
    fundings: state.budgetLevelsPage.fundings,
    fundingId: state.budgetLevelsPage.fundingId,
    yearStart: state.budgetLevelsPage.yearStart,
    yearEnd: state.budgetLevelsPage.yearEnd,
    years: state.budgetLevelsPage.years,
    scenarios: state.budgetLevelsPage.scenarios,
    scenarioId: state.budgetLevelsPage.scenarioId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getInds,
    getBudLevValues,
    getGoals,
    getTransportTypes,
    setGoalId,
    setTransportTypeId,
    getFundings,
    setFundingId,
    getYears,
    setYearStart,
    setYearEnd,
    getScenarios,
    setScenarioId,
    setCheckedIndId,
  }),
  withRouter
)(BudgetLevelsContainer);
