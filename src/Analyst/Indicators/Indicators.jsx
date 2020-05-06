import React from "react";
import indsstyle from "./Indicators.module.css";

import { MDBRow } from "mdbreact";
import IndsList from "./IndsList/IndsList";

import IndsInfo from "./IndsInfo/IndsInfo";
import IndData from "./IndData/IndData";

let Indicators = (props) => {
  //debugger;
  return (
    <div>
      <MDBRow style={{ marginTop: "40px" }}>
        <IndsList
          inds={props.indsPage.inds}
          isFetchingInds={props.indsPage.isFetchingInds}
          goals={props.indsPage.goals}
          transportTypes={props.indsPage.transportTypes}
          setGoalId={props.indsPage.setGoalId}
          goalId={props.indsPage.goalId}
          setSearchQuery={props.indsPage.setSearchQuery}
          searchQuery={props.indsPage.searchQuery}
          transportTypeId={props.indsPage.transportTypeId}
          setTransportTypeId={props.indsPage.setTransportTypeId}
          frequencies={props.indsPage.frequencies}
          setFrequencyId={props.indsPage.setFrequencyId}
          frequencyId={props.indsPage.frequencyId}
          onFilterChanged={props.onFilterChanged}
          quarters={props.indsPage.quarters}
          indsQuarterId={props.indsPage.indsQuarterId}
          years={props.indsPage.years}
          indsYearStart={props.indsPage.indsYearStart}
          indsYearEnd={props.indsPage.indsYearEnd}
        />
        <IndData
          indVals={props.indsPage.indVals}
          isFetchingIndData={props.indsPage.isFetchingIndData}
          frequencyId={props.indsPage.frequencyId}
        />
        <IndsInfo
          indVals={props.indsPage.indVals}
          inds={props.indsPage.inds}
          isFetchingIndData={props.indsPage.isFetchingIndData}
          goals={props.indsPage.goals}
          goalId={props.indsPage.goalId}
          transportTypes={props.indsPage.transportTypes}
          transportTypeId={props.indsPage.transportTypeId}
          indId={props.indsPage.indId}
        />
      </MDBRow>
    </div>
  );
};

export default Indicators;
