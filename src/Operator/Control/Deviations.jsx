import React from "react";
import "moment/locale/ru";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import StringFilter from "../../Common/Filters/StringFilter";
import DateFilter from "../../Common/Filters/DateFilter";
import NumericFilter from "../../Common/Filters/NumericFilter";

export default class OperatorControlDeviationsPage extends React.Component {
  state = {
    filtersList: {
      id: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      parameterCode: {
        type: "text",
        operator: "contains",
        value: null,
      },
      parameterName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      okeiName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      frequencyName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      parameterDate: {
        type: "date",
        operator: "equals",
        value: null,
      },
      year: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      value: {
        type: "numeric",
        operator: "equals",
        value: null,
      },

      previousValue: {
        type: "numeric",
        operator: "equals",
        value: null,
      },

      yty: {
        type: "numeric",
        operator: "equals",
        value: null,
      },

      coefficient: {
        type: "numeric",
        operator: "equals",
        value: null,
      },
    },
  };

  tableRef = React.createRef();

  updateFilter = (e) => {
    console.log("Update Filter received =", e);
    let newFilter = this.state.filtersList;
    newFilter[e.id] = { value: e.value, operator: e.operator, type: e.type };
    console.log("New Filter =", newFilter);
    this.setState({ filtersList: newFilter });
  };

  render() {
    const columns = [
      {
        field: "id",
        title: "#",
        filtering: false,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },

      {
        field: "parameterCode",
        title: "Код показателя",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <StringFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "parameterName",
        title: "Наименование показателя",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <StringFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "okeiName",
        title: "Единица измерений",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <StringFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "frequencyName",
        title: "Частота обновления",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <StringFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "parameterDate",
        title: "Отчетная дата",
        filtering: true,
        type: "date",
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <DateFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },

      {
        field: "year",
        title: "Отчетный год",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "value",
        title: "Значение",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "previousValue",
        title: "Значение в предшествующем году",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "yty",
        title: "Изменение г/г, %",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
      {
        field: "coefficient",
        title: "Коэффициент вариации ряда",
        filtering: true,
        filterComponent: (props) => {
          console.log(`Column ${props.columnDef.field} props =`, props);
          return (
            <NumericFilter
              id={props.columnDef.field}
              columnId={props.columnDef.tableData.id}
              filter={this.state.filtersList[props.columnDef.field]}
              filterChanged={props.onFilterChanged}
              changed={this.updateFilter}
            />
          );
        },
      },
    ];

    return (
      <React.Fragment>
        <TableContainerWithFilters
          columns={columns}
          tableRef={this.tableRef}
          title={"Анализ отклонений"}
          baseUrl={"views/control-parameter-y-2-ies"}
          filtersList={this.state.filtersList}
          loadAll={true}
        />
      </React.Fragment>
    );
  }
}
