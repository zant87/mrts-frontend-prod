import React from "react";
import { MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";

let ParamsInfo = (props) => {
  let transportName = null;
  let strategyversion = null;

  if (props.paramVals) {
    props.params.forEach((item) => {
      if (item.id == props.paramId) {
        //transportName = item.transportTypeName;
      }
    });

    // props.goals.forEach(item => {
    //   if (item.id == props.goalId) {
    //     goalDesc = item.description;
    //     strategyversion = item.transportStrategyVersionName;
    //   }
    // });
  }
  return (
    <MDBCol lg="3" className="info">
      <MDBCard style={{ width: "100%" }}>
        <MDBCardHeader color=" special-color">Доп. информация</MDBCardHeader>
        <MDBCardBody>
          {props.isFetchingParamData ? (
            <Preloader />
          ) : (
            <div>
              <MDBCardText>
                {props.paramVals ? (
                  <div className="text-justify text-uppercase">
                    <div>
                      <span>
                        <strong>Наименование показателя: </strong>
                        <div>{props.paramVals[0].parameterName}</div>
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Форма \ ОКУД: </strong>
                        {props.paramVals[0].okudName}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Код показателя: </strong>
                        {props.paramVals[0].parameterCode}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Нормативно-правовой документ: </strong>
                        {props.paramVals[0].documentRequisite}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardText>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default ParamsInfo;
