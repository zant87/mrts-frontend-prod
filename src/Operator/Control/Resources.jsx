import React from "react";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class OperatorControlResourcesPage extends React.Component {
  state = {
    filtersList: {
      id: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      directionName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      year: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      controlFederation: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      controlRegional: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      controlOther: {
        type: "integer",
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
        field: "directionName",
        title: "Направление расхода",
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
        field: "controlFederation",
        title: "Наличие отчета по финансированию из Федерального бюджета",
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
        field: "controlRegional",
        title: "Наличие отчета по финансированию из бюджетов субъектов России",
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
        field: "controlOther",
        title: "Наличие отчета по финансированию из внебюджетных источников",
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
          title={"Контроль поступления и согласования данных по выполнению ресурсного обеспечения"}
          baseUrl={"views/control-budget-reports"}
          filtersList={this.state.filtersList}
          loadAll={true}
        />
      </React.Fragment>
    );
  }
}
