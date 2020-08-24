import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBDataTable, ExportToCSV, MDBIcon } from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";
import { ExportXLSX } from "@/Common/ExportXLSX/ExportXLSX";

const BudgetLevelsTable = (props) => {
  let budLevVals = null;
  let years = [];
  let rows = {};
  let rowsarr = [];
  let scenarioName = null;
  let fundingName = null;
  let legend = [];
  let data = {
    column: null,
    rows: null,
  };

  if (props.budLevVals) {
    budLevVals = props.budLevVals.sort((a, b) => (a.year > b.year ? 1 : -1));

    budLevVals.forEach((item) => {
      years.push(item.year);
      scenarioName = item.scenarioName;
      fundingName = item.fundingSourceName;
    });

    legend = legend.concat(scenarioName, fundingName).sort((a, b) => (a > b ? 1 : -1));

    years = budLevVals.map((item) => item.year).filter((item, i, arr) => arr.indexOf(item) === i);

    //---------------Объект data для MDBDataTable
    data = {
      columns: [
        {
          label: "Тип значения / Год, ",
          field: "Сценарий",
          sort: "asc",
          width: 250,
        },
      ],
      rows: [],
    };

    years.map((year) =>
      data.columns.push({
        label: " " + year,
        field: " " + year,
        sort: "asc",
        width: 120,
      })
    );

    rows.Сценарий = scenarioName;

    legend.forEach((scen) => {
      rows = {};
      if (scen == scenarioName) {
        rows.Сценарий = "Уровень достижения по сценарию " + scen;
        years.forEach((year) => {
          rows[" " + year] = budLevVals
            .filter((val, i, arr) => {
              if (val.scenarioName == scen && val.year == year) {
                return val.indicatorLevel;
              } else {
                return null;
              }
            })
            .map((item) => item.indicatorLevel)
            .find((item, i, arr) => arr.indexOf(item) === i);
        });
        rowsarr.push(rows);
        rows = null;
      } else if (scen == fundingName) {
        rows.Сценарий = "Источник финансирования: " + scen;
        years.forEach((year) => {
          rows[" " + year] = budLevVals
            .filter((val, i, arr) => {
              if (val.fundingSourceName == scen && val.year == year) {
                return val.financeLevel;
              } else {
                return null;
              }
            })
            .map((item) => item.financeLevel)
            .find((item, i, arr) => arr.indexOf(item) === i);
        });

        rowsarr.push(rows);
        rows = null;
      }
    });
    data.rows = rowsarr;
    console.log(data);
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
                {props.budLevVals ? (
                  <div>
                    <div style={{ fontSize: "11px" }}>
                      Индикатор: {props.budLevVals[0].indicatorCode.replace("IND_", "") + " " + props.budLevVals[0].indicatorName}
                    </div>
                    <div style={{ fontSize: "11px" }}>Заданный период: {props.yearStart + "-" + props.yearEnd + " гг."}</div>
                    <div style={{ fontSize: "11px" }}> Сценарий: {props.budLevVals[0].scenarioName}</div>
                    <div style={{ fontSize: "11px" }}> Источник финансирования: {props.budLevVals[0].fundingSourceName}</div>
                    <div style={{ fontSize: "11px" }}> Вид транспорта: {props.budLevVals[0].transportName}</div>
                  </div>
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardTitle>
              {props.isFetchingBudLevData ? (
                <Preloader />
              ) : (
                <MDBCardText>
                  {props.budLevVals ? (
                    <div>
                      <ExportXLSX csvData={data.rows} fileName={"exportBudgetLevels"} />

                      <MDBDataTable
                        displayEntries={false}
                        paging={false}
                        scrollX
                        striped
                        theadTextWhite
                        fixed
                        theadColor="special-color"
                        searching={false}
                        responsiveMd
                        hover
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

export default BudgetLevelsTable;
