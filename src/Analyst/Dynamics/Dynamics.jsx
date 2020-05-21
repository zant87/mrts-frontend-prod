import React from "react";
import dynstyle from "./Dynamics.module.css";

import { MDBRow } from "mdbreact";
import DynSettings from "./DynSettings/DynSettings";
import DynamicsData from "./DynamicsData/DynamicsData";

//import DynamicsData from "./DynamicsData/DynamicsData";

let Dynamics = (props) => {
  //debugger;
  return (
    <div>
      <MDBRow style={{ marginTop: "20px" }}>
        <DynSettings
          inds={props.dynamicsPage.inds}
          isFetchingInds={props.dynamicsPage.isFetchingInds}
          goals={props.dynamicsPage.goals}
          transportTypes={props.dynamicsPage.transportTypes}
          setGoalId={props.dynamicsPage.setGoalId}
          goalId={props.dynamicsPage.goalId}
          //setSearchQuery={props.dynamicsPage.setSearchQuery}
          // searchQuery={props.dynamicsPage.searchQuery}
          transportTypeId={props.dynamicsPage.transportTypeId}
          setTransportTypeId={props.dynamicsPage.setTransportTypeId}
          frequencies={props.dynamicsPage.frequencies}
          setFrequencyId={props.dynamicsPage.setFrequencyId}
          frequencyDynId={props.dynamicsPage.frequencyDynId}
          onFilterChanged={props.onFilterChanged}
          years={props.dynamicsPage.years}
          year={props.dynamicsPage.year}
          quarters={props.dynamicsPage.quarters}
          quarterId={props.dynamicsPage.quarterId}
          setYear={props.dynamicsPage.year}
          setQuarterId={props.dynamicsPage.setQuarterId}
          scenarios={props.dynamicsPage.scenarios}
          scenarioId={props.dynamicsPage.scenarioId}
          setScenarioId={props.dynamicsPage.setScenarioId}
          getDynValues={props.dynamicsPage.getDynValues}
        />
        <DynamicsData
          dynVals={props.dynamicsPage.dynVals}
          isFetchingDynData={props.dynamicsPage.isFetchingDynData}
          frequencyDynId={props.dynamicsPage.frequencyDynId}
        />
      </MDBRow>
    </div>
  );
};

export default Dynamics;
