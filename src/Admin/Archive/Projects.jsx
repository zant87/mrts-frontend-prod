import React from "react";
import TableContainer from "../../Containers/TableContainer";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";
import { MDBDatePicker } from "mdbreact";

export default class AdminArchiveProjectsPage extends React.Component {
  render() {
    const columns = [
      { field: "id", title: "#", filtering: false, editable: "never" },
      { field: "year", title: "Отчетный год" },
      { field: "quarterName", title: "Отчетный квартал", filtering: true, editable: "never" },
      { field: "projectName", title: "Имя проекта", filtering: true, editable: "never" },
      { field: "planBeginYear", title: "Год начала" },
      { field: "planEndYear", title: "Год окончания" },
      { field: "planCost", title: "План", filtering: false, editable: "never" },
      { field: "reportFactCost", title: "Отчетный факт", filtering: false, editable: "never" },
      { field: "factCost", title: "Факт", filtering: false, editable: "never" },
      {
        field: "beginDate",
        title: "Дата изменения записи",
        filtering: true,
        type: "date",
        filterComponent: (props) => {
          return (
            <MDBDatePicker
              clearable={true}
              invalidDateMessage="Неверный формат"
              clearLabel="Очистить"
              emptyLabel=""
              keyboard={true}
              okLabel="Применить"
              locale={moment.locale("ru")}
              valueDefault={null}
              getValue={(event) => {
                props.onFilterChanged(props.columnDef.tableData.id, event);
              }}
              format="DD.MM.YYYY"
              cancelLabel="Отмена"
            />
          );
        },
      },
      {
        field: "endDate",
        title: "Дата окончания действия записи",
        filtering: true,
        type: "date",
        filterComponent: (props) => {
          return (
            <MDBDatePicker
              clearable={true}
              invalidDateMessage="Неверный формат"
              clearLabel="Очистить"
              emptyLabel=""
              keyboard={true}
              okLabel="Применить"
              locale={moment.locale("ru")}
              valueDefault={null}
              getValue={(event) => {
                props.onFilterChanged(props.columnDef.tableData.id, event);
              }}
              format="DD.MM.YYYY"
              cancelLabel="Отмена"
            />
          );
        },
      },
    ];

    const filtersList = {
      year: "equals",
      planBeginYear: "equals",
      planEndYear: "equals",
      beginDate: "date",
      endDate: "date",
    };

    return (
      <React.Fragment>
        <TableContainer
          columns={columns}
          title={"Архив отчетов исполнителей по выполнению крупных инвестпроектов"}
          baseUrl={"views/i-4-s"}
          filtersList={filtersList}
          loadAll={true}
        />
      </React.Fragment>
    );
  }
}
