import React from "react";
import paramsstyle from "./Parameters.module.css";

import { MDBRow } from "mdbreact";
import ParamsList from "./ParamsList/ParamsList";

import ParamsInfo from "./ParamsInfo/ParamsInfo";
import ParamData from "./ParamData/ParamData";

let Parameters = (props) => {
  //debugger;
  return (
    <div>
      <MDBRow style={{ marginTop: "40px" }}>
        <ParamsList
          params={props.paramsPage.params}
          isFetchingParams={props.paramsPage.isFetchingParams}
          transportTypes={props.paramsPage.transportTypes}
          setSearchQuery={props.paramsPage.setSearchQuery}
          searchQuery={props.paramsPage.searchQuery}
          transportTypeId={props.paramsPage.transportTypeId}
          setTransportTypeId={props.paramsPage.setTransportTypeId}
          frequencies={props.paramsPage.frequencies}
          setFrequencyId={props.paramsPage.setFrequencyId}
          frequencyId={props.paramsPage.frequencyId}
          onFilterChanged={props.onFilterChanged}
          forms={props.paramsPage.forms}
          checkedFormId={props.paramsPage.checkedFormId}
          quarters={props.paramsPage.quarters}
          paramQuarterId={props.paramsPage.paramQuarterId}
          years={props.paramsPage.years}
          paramYearStart={props.paramsPage.paramYearStart}
          paramYearEnd={props.paramsPage.paramYearEnd}
          setParamQuarterId={props.paramsPage.setParamQuarterId}
          setCheckedFormId={props.paramsPage.setCheckedFormId}
        />

        <ParamData
          paramVals={props.paramsPage.paramVals}
          isFetchingParamData={props.paramsPage.isFetchingParamData}
          frequencyId={props.paramsPage.frequencyId}
        />
        <ParamsInfo
          paramVals={props.paramsPage.paramVals}
          params={props.paramsPage.params}
          isFetchingParamData={props.paramsPage.isFetchingParamData}
          transportTypes={props.paramsPage.transportTypes}
          transportTypeId={props.paramsPage.transportTypeId}
          paramId={props.paramsPage.paramId}
        />
      </MDBRow>
    </div>
  );
};

export default Parameters;
