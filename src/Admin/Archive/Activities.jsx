import React from "react";
import TableContainer from "../../Containers/TableContainer";
import "moment/locale/ru";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import DateFilter from "../../Common/Filters/DateFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class AdminArchiveActivitiesPage extends React.Component {

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
      activityCode: {
        type: "text",
        operator: "contains",
        value: null
      },
      activityName: {
        type: "text",
        operator: "contains",
        value: null
      },
      activityDocumentType: {
        type: "text",
        operator: "contains",
        value: null
      },
      activityExecutors: {
        type: "text",
        operator: "contains",
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
        field: "year", title: "Отчетный год",
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
        field: "activityCode", title: "Код", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "activityName", title: "Содержание мероприятия", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "activityDocumentType", title: "Тип документа", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "activityExecutors", title: "Исполнитель", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
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
              title={"Архив отчетов исполнителей по выполнению мероприятий по реализации транспортной стратегии"}
              baseUrl={"views/i-3-s"}
              filtersList={this.state.filtersList}
              loadAll={true}
          />
        </React.Fragment>
    );
  }
}
