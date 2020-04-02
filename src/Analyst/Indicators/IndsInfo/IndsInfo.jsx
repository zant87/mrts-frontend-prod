import React from "react";
import { MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";

let IndsInfo = props => {
  let transportName = null;
  let goalDesc = null;
  let strategyversion = null;

  if (props.indVals) {
    props.inds.forEach(item => {
      if (item.id == props.indId) {
        transportName = item.transportTypeName;
      }
    });

    props.goals.forEach(item => {
      if (item.id == props.goalId) {
        goalDesc = item.description;
        strategyversion = item.transportStrategyVersionName;
      }
    });
  }
  return (
    <MDBCol lg="3" className="info ">
      <MDBCard style={{ width: "100%" }}>
        <MDBCardHeader color=" special-color">Доп. информация</MDBCardHeader>
        <MDBCardBody>
          {props.isFetchingIndData ? (
            <Preloader />
          ) : (
            <div>
              <MDBCardText>
                {props.indVals ? (
                  <div className="text-justify text-uppercase">
                    <div>
                      <span>
                        <strong>Наименование индикатора: </strong>
                        <div>{props.indVals[0].indicatorCode.replace("IND_", "") + " " + props.indVals[0].indicatorName}</div>
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Единица измерения: </strong>
                        {props.indVals[0].okeiName}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Вид транспорта: </strong>
                        {transportName}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Цель: </strong>
                        {props.indVals[0].goalName}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Описание цели: </strong>
                        {goalDesc}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Версия ТС: </strong>
                        {strategyversion}
                      </span>
                    </div>
                    <hr />
                    <div>
                      <span>
                        <strong>Наименование документа: </strong>
                        {props.indVals[0].documentName}
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

export default IndsInfo;
