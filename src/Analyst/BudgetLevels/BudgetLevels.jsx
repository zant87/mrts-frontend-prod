import React from "react";
import budlevstyle from "./BudgetLevels.module.css";

import { MDBRow } from "mdbreact";
import BudgetLevelsSettings from "./BudgetLevelsSettings/BudgetLevelsSettings";
import BudgetLevelsData from "./BudgetLevelsData/BudgetLevelsData";

let BudgetLevels = (props) => {
  //debugger;
  return (
    <div>
      <MDBRow style={{ marginTop: "0px" }}>
        <BudgetLevelsSettings
          inds={props.budgetLevelsPage.inds}
          isFetchingInds={props.budgetLevelsPage.isFetchingInds}
          goals={props.budgetLevelsPage.goals}
          transportTypes={props.budgetLevelsPage.transportTypes}
          setGoalId={props.budgetLevelsPage.setGoalId}
          goalId={props.budgetLevelsPage.goalId}
          transportTypeId={props.budgetLevelsPage.transportTypeId}
          setTransportTypeId={props.budgetLevelsPage.setTransportTypeId}
          fundings={props.budgetLevelsPage.fundings}
          fundingId={props.budgetLevelsPage.fundingId}
          onFilterChanged={props.onFilterChanged}
          years={props.budgetLevelsPage.years}
          yearStart={props.budgetLevelsPage.yearStart}
          yearEnd={props.budgetLevelsPage.yearEnd}
          setYearStart={props.budgetLevelsPage.setYearStart}
          setYearEnd={props.budgetLevelsPage.setYearEnd}
          scenarios={props.budgetLevelsPage.scenarios}
          scenarioId={props.budgetLevelsPage.scenarioId}
          setScenarioId={props.budgetLevelsPage.setScenarioId}
          getBudLevValues={props.budgetLevelsPage.getBudLevValues}
          checkedIndId={props.budgetLevelsPage.checkedIndId}
          setCheckedIndId={props.budgetLevelsPage.setCheckedIndId}
        />
        <BudgetLevelsData
          budLevVals={props.budgetLevelsPage.budLevVals}
          isFetchingBudLevData={props.budgetLevelsPage.isFetchingBudLevData}
          fundingId={props.budgetLevelsPage.fundingId}
          yearStart={props.budgetLevelsPage.yearStart}
          yearEnd={props.budgetLevelsPage.yearEnd}
          scenarioId={props.budgetLevelsPage.scenarioId}
        />
      </MDBRow>
    </div>
  );
};

export default BudgetLevels;
