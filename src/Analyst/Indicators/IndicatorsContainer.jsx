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
  setIndFrequencyId,
  getYears,
  getQuarters,
  setIndsQuarterId,
  setIndsYearStart,
  setIndsYearEnd,
} from "@/_reducers/inds-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";


class IndicatorsContainer extends React.Component {
  componentDidMount() {
    this.props.getGoals();

    // let goals = this.props.goals;
    // if (goals) {
    //   let goalId = goals.sort((a, b) => (a.code > b.code ? 1 : -1))[0].id;
    // }
    
    this.props.getTransportTypes();
    this.props.getInds();
    this.props.getFrequencies();
    this.props.getYears();
    this.props.getQuarters();
    let indId = this.props.match.params.indId;

    if (indId) {
      this.props.getIndValues(
        indId,
        this.props.indFrequencyId,
        this.props.indsYearStart,
        this.props.indsYearEnd,
        this.props.indsQuarterId
      );
      //debugger;
    }
  }

  componentDidUpdate(prevProps) {
    let indId = this.props.match.params.indId;
    if (indId !== prevProps.match.params.indId) {
      if (indId) {
        this.props.getIndValues(
          indId,
          this.props.indFrequencyId,
          this.props.indsYearStart,
          this.props.indsYearEnd,
          this.props.indsQuarterId
        );
        // debugger;
      }
    }
  }

  onFilterChanged = (indFrequencyId, yearStart, yearEnd, quarterId) => {
    let indId = this.props.match.params.indId;
    this.props.setIndFrequencyId(indFrequencyId);
    this.props.setIndsYearStart(yearStart);
    this.props.setIndsYearEnd(yearEnd);
    if (quarterId != null) {
      this.props.setIndsQuarterId(quarterId);
    }
    if (indId) {
      this.props.getIndValues(
        indId,
        indFrequencyId,
        yearStart,
        yearEnd,
        quarterId
      );
    }
  };

  render() {
    return (
      <div>
        <Indicators
          indsPage={this.props}
          onFilterChanged={this.onFilterChanged}
        />
        ;
      </div>
    );
  }
}

let mapStateToProps = (state) => {
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
    indFrequencyId: state.indsPage.indFrequencyId,
    quarters: state.indsPage.quarters,
    indsQuarterId: state.indsPage.indsQuarterId,
    years: state.indsPage.years,
    indsYearStart: state.indsPage.indsYearStart,
    indsYearEnd: state.indsPage.indsYearEnd,
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
    setIndFrequencyId,
    getYears,
    getQuarters,
    setIndsQuarterId,
    setIndsYearStart,
    setIndsYearEnd,
  }),
  withRouter
)(IndicatorsContainer);
