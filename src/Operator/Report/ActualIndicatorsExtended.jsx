import React from "react";
import { toast, MDBInput } from "mdbreact";
import appAxios from "../../_services/appAxios";
import { ruLocalization } from "../../_components";
import MaterialTable from "material-table";
import TableContainer from "../../Containers/TableContainer";
import { authenticationService } from "../../_services";

export default class OperatorActualIndicatorsExtendedPage extends React.Component {
  state = {
    page: 0,
    count: 0,
    data: [],
    isLoading: false,
    username: "",
  };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        username: x.id,
      })
    );
  }

  render() {
    const editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          console.log("User to insert =", this.state.username);
          const data = { ...newData, username: this.state.username };
          console.log("Data to insert =", data);

          setTimeout(() => {
            appAxios({
              url: `/views/actual-indicator-ext`,
              method: "PUT",
              data: data,
            }).then((response) => {
              const message = response.headers["x-mrts-backend-params"];
              toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                closeButton: false,
              });
            });

            resolve();
          }, 1000);
        }),
    };

    const columns = [
      { field: "id", title: "#", filtering: false, editable: "never" },
      { field: "indicatorCodeShort", title: "Код", filtering: true, editable: "never" },
      { field: "indicatorName", title: "Наименование", filtering: true, editable: "never" },
      { field: "scenarioName", title: "Сценарий", filtering: true, editable: "never" },
      { field: "okeiName", title: "Единица измерения", filtering: true, editable: "never" },
      { field: "valueTypeName", title: "Тип значения", filtering: true, editable: "never" },
      { field: "year", title: "Год", filtering: true, editable: "never" },
      { field: "quarterName", title: "Квартал", filtering: true, editable: "never" },
      { field: "transportTypeName", title: "Вид транспорта", filtering: true, editable: "never" },
      { field: "username", title: "Ответственный", filtering: true, editable: "never" },
      { field: "calcScript", title: "Результаты расчета", filtering: true, editable: "never" },
      {
        field: "indicatorValue",
        title: "Значение",
        type: "numeric",
        editable: "always",
        // filterComponent: (props) => {
        //   let checkInput = (event) => {
        //     let value = parseInt(event.target.value.toString(), 10);
        //     //debugger;
        //     console.log("Введенное" + value);
        //     return "";
        //   };
        //   return (
        //     <MDBInput
        //       //onInput={checkInput}
        //       type="text"
        //       getValue={(event) => {
        //         debugger;
        //         let value = parseInt(event);
        //         props.onFilterChanged(props.columnDef.tableData.id, value);
        //       }}
        //     />
        //   );
        // },
      },
    ];

    const filtersList = {
      year: "numeric",
    };

    return (
      <React.Fragment>
        <TableContainer
          columns={columns}
          title={"Индикаторы за отчетный период"}
          baseUrl={"views/actual-indicator-ext"}
          filterMinimalLength={1}
          editable={editable}
          filtersList={filtersList}
          loadAll={true}
        />
      </React.Fragment>
    );
  }
}
