import React from "react";
import levstyle from "./Levels.module.css";

import { MDBRow } from "mdbreact";
import LevSettings from "./LevSettings/LevSettings";
import LevelsData from "./LevelsData/LevelsData";

let Levels = (props) => {
  //debugger;
  return (
    <div>
      <MDBRow style={{ marginTop: "40px" }}>
        <LevSettings
          inds={props.levelsPage.inds}
          isFetchingInds={props.levelsPage.isFetchingInds}
          goals={props.levelsPage.goals}
          transportTypes={props.levelsPage.transportTypes}
          setGoalId={props.levelsPage.setGoalId}
          goalId={props.levelsPage.goalId}
          //setSearchQuery={props.levelsPage.setSearchQuery}
          // searchQuery={props.levelsPage.searchQuery}
          transportTypeId={props.levelsPage.transportTypeId}
          setTransportTypeId={props.levelsPage.setTransportTypeId}
          frequencies={props.levelsPage.frequencies}
          setFrequencyId={props.levelsPage.setFrequencyId}
          frequencyLevId={props.levelsPage.frequencyLevId}
          onFilterChanged={props.onFilterChanged}
          years={props.levelsPage.years}
          year={props.levelsPage.year}
          quarters={props.levelsPage.quarters}
          quarterId={props.levelsPage.quarterId}
          setYear={props.levelsPage.year}
          setQuarterId={props.levelsPage.setQuarterId}
          scenarios={props.levelsPage.scenarios}
          scenarioId={props.levelsPage.scenarioId}
          setScenarioId={props.levelsPage.setScenarioId}
          getLevValues={props.levelsPage.getLevValues}
        />
        <LevelsData
          levVals={props.levelsPage.levVals}
          isFetchingLevData={props.levelsPage.isFetchingLevData}
          frequencyLevId={props.levelsPage.frequencyLevId}
        />
      </MDBRow>
    </div>
  );
};

export default Levels;
