import React from "react";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class OperatorControlIndicatorsPage extends React.Component {
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
      year: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      quarterName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      dataSource: {
        type: "text",
        operator: "contains",
        value: null,
      },
      control: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      responsible: {
        type: "text",
        operator: "contains",
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
        field: "quarterName",
        title: "Отчетный квартал",
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
        field: "dataSource",
        title: "Источники данных",
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
        field: "control",
        title: "Наличие данных",
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
        field: "responsible",
        title: "Ответственное лицо",
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
    ];

    return (
      <React.Fragment>
        <TableContainerWithFilters
          columns={columns}
          tableRef={this.tableRef}
          title={"Контроль наличия исходных данных для расчета показателей"}
          baseUrl={"views/control-parameter-data"}
          filtersList={this.state.filtersList}
          loadAll={true}
        />
      </React.Fragment>
    );
  }
}
