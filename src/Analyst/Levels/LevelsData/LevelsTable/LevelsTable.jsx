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
import { ExportXLSX } from "@/Common/ExportXLSX/ExportXLSX";

const LevelsTable = (props) => {
  let levVals = null;
  let data = {
    column: null,
    rows: null,
  };

  if (props.levVals) {
    levVals = props.levVals.sort((a, b) =>
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
          width: 450,
        },
        {
          label: "Вид транспорта",
          field: "transportName",
          sort: "asc",
          width: 200,
        },
        {
          label: "Уровень достижения, %",
          field: "level",
          sort: "asc",
          width: 150,
        },
      ],
      rows: levVals.map((item) => ({
        indicatorCode: item.indicatorCode.replace("IND_", ""),
        indicatorName: item.indicatorName,
        transportName: item.transportTypeName,
        level: item.level,
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
                {props.levVals ? (
                  <div>
                    Уровни достижения за {levVals[0].quarterLabel} г. <br />
                    <br />
                    Цель: {props.levVals[0].goalName} <br />
                    Сценарий: {props.levVals[0].scenarioName} <br />
                    Год: {props.levVals[0].year}
                  </div>
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardTitle>
              {props.isFetchingLevData ? (
                <Preloader />
              ) : (
                <MDBCardText>
                  {props.levVals ? (
                    <div>
                      <ExportXLSX
                        csvData={levVals.map((item) => ({
                          Код: item.indicatorCode.replace("IND_", ""),
                          "Наименование индикатора": item.indicatorName,
                          "Вид транспорта": item.transportTypeName,
                          "Уровень достижения": item.level,
                        }))}
                        fileName={"exportLevels"}
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
                        fixed
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

export default LevelsTable;
