import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBDataTable,
  ExportToCSV,
  MDBIcon,
} from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";
import { ExportXLSX } from "../../../../Common/ExportXLSX/ExportXLSX";

const DynamicsTable = (props) => {
  let dynVals = null;
  let data = {
    column: null,
    rows: null,
  };

  if (props.dynVals) {
    dynVals = props.dynVals.sort((a, b) =>
      a.indicatorCode > b.indicatorCode ? 1 : -1
    );

    //---------------Объект data для MDBDataTable
    data = {
      columns: [
        {
          label: "Код",
          field: "indicatorCode",
          sort: "asc",
          width: 70,
        },
        {
          label: "Наименование индикатора",
          field: "indicatorName",
          sort: "asc",
          width: 350,
        },
        {
          label: "Вид транспорта",
          field: "transportName",
          sort: "asc",
          width: 150,
        },
        {
          label: "Предыдущий уровень достижения, %",
          field: "previosLevel",
          sort: "asc",
          width: 150,
        },
        {
          label: "Текущий уровень достижения, %",
          field: "currentLevel",
          sort: "asc",
          width: 150,
        },
        {
          label: "Динамика, %",
          field: "dynamic",
          sort: "asc",
          width: 100,
        },
      ],
      rows: dynVals.map((item) => ({
        indicatorCode: item.indicatorCode.replace("IND_", ""),
        indicatorName: item.indicatorName,
        transportName: item.transportTypeName,
        previosLevel: item.previousLevel,
        currentLevel: item.currentLevel,
        dynamic: item.dynamic,
      })),
    };
  }

  return (
    <div>
      <MDBRow>
        <MDBCol>
          <MDBCard className="w-100 ">
            <MDBCardBody>
              <MDBCardTitle
                style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {props.dynVals ? (
                  <div>
                    Динамика уровня достижения за {dynVals[0].quarterLabel} г.{" "}
                    <br />
                    <br />
                    Цель: {props.dynVals[0].goalName} <br />
                    Сценарий: {props.dynVals[0].scenarioName} <br />
                    Год: {props.dynVals[0].year}
                  </div>
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardTitle>
              {props.isFetchingDynData ? (
                <Preloader />
              ) : (
                <MDBCardText>
                  {props.dynVals ? (
                    <div>
                      <ExportXLSX
                        csvData={dynVals.map((item) => ({
                          Код: item.indicatorCode.replace("IND_", ""),
                          "Наименование индикатора": item.indicatorName,
                          "Вид транспорта": item.transportTypeName,
                          "Пред. уровень достиженя": item.previousLevel,
                          "Текущий уровень достижения": item.currentLevel,
                          Динамика: item.dynamic,
                        }))}
                        fileName="exportDynamics"
                      />

                      {/* <ExportToCSV
                        columns={data.columns}
                        data={data.rows}
                        color="deep-orange"
                        style={{ marginBottom: "20px" }}
                        size="sm"
                      >
                        <MDBIcon icon="file-export" className="mr-1" /> Экспорт
                        в CSV
                      </ExportToCSV> */}

                      <MDBDataTable
                        //info={false}
                        //filter="valueTypeName"
                        displayEntries={false}
                        paging={false}
                        scrollX
                        striped
                        theadTextWhite
                        // infoLabel={["Показано с", "по", "из", "записей"]}
                        // entriesLabel="Выводить по"
                        //theadColor="blue-grey lighten-5"
                        //theadColor="blue-grey lighten-5"
                        theadColor="special-color"
                        // theadTextWhite
                        searching={false}
                        //searchLabel="Поиск"
                        responsiveMd
                        hover
                        // exportToCSV
                        // paginationLabel={["Предыдущая", "Следующая"]}
                        maxHeight="600px"
                        bordered
                        data={data}
                      />
                    </div>
                  ) : (
                    <div>Нет данных</div>
                  )}
                </MDBCardText>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default DynamicsTable;
