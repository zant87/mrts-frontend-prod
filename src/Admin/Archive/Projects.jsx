import React from "react";
import TableContainer from "../../Containers/TableContainer";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";
import {MDBDatePicker} from "mdbreact";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import DateFilter from "../../Common/Filters/DateFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class AdminArchiveProjectsPage extends React.Component {

  state = {
    filtersList: {
      id: {
        type: "integer",
        operator: "equals",
        value: null
      },
      year: {
        type: "integer",
        operator: "equals",
        value: null
      },
      quarterName: {
        type: "text",
        operator: "contains",
        value: null
      },
      projectName: {
        type: "text",
        operator: "contains",
        value: null
      },
      planBeginYear: {
        type: "integer",
        operator: "equals",
        value: null
      },
      planEndYear: {
        type: "integer",
        operator: "equals",
        value: null
      },
      planCost: {
        type: "numeric",
        operator: "equals",
        value: null
      },
      reportFactCost: {
        type: "numeric",
        operator: "equals",
        value: null
      },
      factCost: {
        type: "numeric",
        operator: "equals",
        value: null
      },
      beginDate: {
        type: "date",
        operator: "equals",
        value: null
      },
      endDate: {
        type: "date",
        operator: "equals",
        value: null
      }
    }
  };

  updateFilter = (e) => {
    console.log('Update Filter received =', e);
    let newFilter = this.state.filtersList;
    newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
    console.log('New Filter =', newFilter);
    this.setState({filtersList: newFilter});
  }

  render() {
    const columns = [
      {
        field: "id", title: "#", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "year", title: "Отчетный год", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "quarterName", title: "Отчетный квартал", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "projectName", title: "Имя проекта", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "planBeginYear", title: "Год начала", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "planEndYear", title: "Год окончания", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "planCost", title: "План", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "reportFactCost", title: "Отчетный факт", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "factCost", title: "Факт", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "beginDate",
        title: "Дата изменения записи",
        filtering: true,
        type: "date",
        filterComponent: props => {
          return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                             filter={this.state.filtersList[props.columnDef.field]}
                             filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "endDate",
        title: "Дата окончания действия записи",
        filtering: true,
        type: "date",
        filterComponent: props => {
          return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                             filter={this.state.filtersList[props.columnDef.field]}
                             filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
    ];

    return (
        <React.Fragment>
          <TableContainerWithFilters
              columns={columns}
              title={"Архив отчетов исполнителей по выполнению крупных инвестпроектов"}
              baseUrl={"views/i-4-s"}
              filtersList={this.state.filtersList}
              loadAll={true}
          />
        </React.Fragment>
    );
  }
}
