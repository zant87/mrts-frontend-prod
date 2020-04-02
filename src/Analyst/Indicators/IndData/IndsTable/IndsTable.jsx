import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBDataTable, ExportToCSV, MDBIcon } from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";

const IndsTable = props => {
  let indsval = null;
  let years = [];
  let rows = {};
  let scenarioNames = [];
  let valuetypeNames = [];
  let okeiName = "";
  let data = {
    column: null,
    rows: null
  };
  let rowsarr = [];

  if (props.indVals) {
    indsval = props.indVals.sort((a, b) => (a.indicatorDate > b.indicatorDate ? 1 : -1));

    indsval.forEach(item => {
      years.push(item.indicatorDate);
      scenarioNames.push(item.scenarioName);
      okeiName = item.okeiName;
      valuetypeNames.push(item.valueTypeName);
    });

    years = indsval.map(item => item.indicatorDate).filter((item, i, arr) => arr.indexOf(item) === i);

    valuetypeNames = indsval.map(item => item.valueTypeName).filter((item, i, arr) => arr.indexOf(item) === i);

    scenarioNames = indsval.map(item => item.scenarioName).filter((item, i, arr) => arr.indexOf(item) === i);

    //---------------Объект data для MDBDataTable
    data = {
      columns: [
        {
          label: "Тип значения / Год, " + okeiName,
          field: "valueTypeName",
          sort: "asc",
          width: 250
        }
      ],
      rows: []
    };

    //-----------Заполнение data.column для MDBDataTable
    years.map(year =>
      //--------Если годовые значения
      props.frequencyId == 1
        ? data.columns.push({
            label: year.split("-")[0],
            field: year.split("-")[0],
            sort: "asc",
            width: 120
          })
        : data.columns.push({
            label: year,
            field: year,
            sort: "asc",
            width: 120
          })
    );

    //-----------Заполнение data.rows для MDBDataTable
    scenarioNames.forEach(scen => {
      rows = {};
      //------------Если годовые значения
      if (props.frequencyId == 1) {
        years.forEach(year => {
          rows[year.split("-")[0]] = indsval
            .filter((val, i, arr) => {
              if (val.scenarioName == scen && val.indicatorDate == year) {
                return val.value;
              } else {
                return null;
              }
            })
            .map(item => item.value)
            .find((item, i, arr) => arr.indexOf(item) === i);
        });
      } else {
        years.forEach(year => {
          rows[year] = indsval
            .filter((val, i, arr) => {
              if (val.scenarioName == scen && val.indicatorDate == year) {
                return val.value;
              } else {
                return null;
              }
            })
            .map(item => item.value)
            .find((item, i, arr) => arr.indexOf(item) === i);
        });
      }

      rowsarr.push(rows);
      rows.valueTypeName = scen;
      rows = null;
    });

    data.rows = rowsarr;
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
                  textTransform: "uppercase"
                }}
              >
                {props.indVals ? (
                  props.indVals[0].indicatorCode.replace("IND_", "") + " " + props.indVals[0].indicatorName
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardTitle>
              {props.isFetchingIndData ? (
                <Preloader />
              ) : (
                <MDBCardText>
                  {props.indVals ? (
                    <div>
                      <ExportToCSV columns={data.columns} data={data.rows} color="deep-orange" size="sm">
                        <MDBIcon icon="file-export" className="mr-1" /> Экспорт в CSV
                      </ExportToCSV>

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
                        searchLabel="Поиск"
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

export default IndsTable;

// data = {
//   columns: [
//     {
//       label: "#",
//       field: "id",
//       sort: "asc",
//       width: 50
//     },
//     {
//       label: "Тип значения",
//       field: "valueTypeName",
//       sort: "asc",
//       width: 150
//     },
//     {
//       label: "Сценарий",
//       field: "scenarioName",
//       sort: "asc",
//       width: 150
//     },
//     {
//       label: "Год",
//       field: "indicatorDate",
//       sort: "asc",
//       width: 150
//     },
//     {
//       label: "Значение",
//       field: "value",
//       sort: "asc",
//       width: 250
//     }
//   ],
//   rows:
//    props.indVals.map(v => ({
//     id: v.id,
//     valueTypeName: v.valueTypeName,
//     scenarioName: v.scenarioName,
//     indicatorDate: v.indicatorDate.split("-")[0],
//     value: v.indicatorValue
//   }))
// };
