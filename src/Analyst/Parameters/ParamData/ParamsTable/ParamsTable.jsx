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

const ParamsTable = (props) => {
  let paramsval = null;
  let years = [];
  let rows = {};
  //let scenarioNames = [];
  //let valuetypeNames = [];
  let okeiName = "";
  let data = {
    column: null,
    rows: null,
  };
  let rowsarr = [];

  if (props.paramVals) {
    paramsval = props.paramVals.sort((a, b) =>
      a.parameterDate > b.parameterDate ? 1 : -1
    );

    paramsval.forEach((item) => {
      years.push(item.parameterDate);
      // scenarioNames.push(item.scenarioName);
      // okeiName = item.okeiName;
      // valuetypeNames.push(item.valueTypeName);
    });

    years = paramsval
      .map((item) => item.parameterDate)
      .filter((item, i, arr) => arr.indexOf(item) === i);

    // valuetypeNames = indsval.map(item => item.valueTypeName).filter((item, i, arr) => arr.indexOf(item) === i);

    //  scenarioNames = indsval.map(item => item.scenarioName).filter((item, i, arr) => arr.indexOf(item) === i);

    //---------------Объект data для MDBDataTable
    data = {
      columns: [
        {
          label: "Тип значения / Год, " + okeiName,
          field: "valueTypeName",
          sort: "asc",
          width: 250,
        },
      ],
      rows: [],
    };

    //-----------Заполнение data.column для MDBDataTable
    years.map((year) =>
      //--------Если годовые значения
      props.frequencyId == 1
        ? data.columns.push({
            label: year.split("-")[0],
            field: year.split("-")[0],
            sort: "asc",
            width: 120,
          })
        : data.columns.push({
            label: year,
            field: year,
            sort: "asc",
            width: 120,
          })
    );

    //-----------Заполнение data.rows для MDBDataTable

    rows = {};
    //------------Если годовые значения
    if (props.frequencyId == 1) {
      years.forEach((year) => {
        rows[year.split("-")[0]] = paramsval
          .filter((val, i, arr) => {
            if (val.parameterDate == year) {
              return val.value;
            } else {
              return null;
            }
          })
          .map((item) => item.value)
          .find((item, i, arr) => arr.indexOf(item) === i);
      });
    } else {
      years.forEach((year) => {
        rows[year] = paramsval
          .filter((val, i, arr) => {
            if (val.parameterDate == year) {
              return val.value;
            } else {
              return null;
            }
          })
          .map((item) => item.value)
          .find((item, i, arr) => arr.indexOf(item) === i);
      });
    }

    rowsarr.push(rows);
    rows.valueTypeName = "Факт";
    rows = null;

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
                  textTransform: "uppercase",
                }}
              >
                {props.paramVals ? (
                  props.paramVals[0].parameterName
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardTitle>
              {props.isFetchingParamData ? (
                <Preloader />
              ) : (
                <MDBCardText>
                  {props.paramVals ? (
                    <div>
                      <ExportXLSX
                        csvData={data.rows}
                        fileName={"exportParams"}
                      />
                      {/* <ExportToCSV
                        columns={data.columns}
                        data={data.rows}
                        color="deep-orange"
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

export default ParamsTable;
