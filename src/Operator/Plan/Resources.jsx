import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast } from "mdbreact";
import ResourcesEdit from "./ResourcesEdit";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";

export default class OperatorPlanResourcesPage extends React.Component {
  state = {
    modal: false,
    row: {},
    action: "",
    initialized: true,
    filtersList: {
      id: {
        type: "integer",
        operator: "equals",
        value: null,
      },
      transportStrategyName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      scenarioName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      costTypeName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      directionName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      fundingSourceName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      stageName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      planingMin: {
        type: "numeric",
        operator: "equals",
        value: null,
      },
      planingMax: {
        type: "numeric",
        operator: "equals",
        value: null,
      },
    },
  };

  tableRef = React.createRef();

  toggleModal = (rowData, action) => {
    if (rowData && action) {
      this.setState({
        modal: !this.state.modal,
        row: rowData,
        action: action,
      });
    } else {
      this.setState({
        modal: !this.state.modal,
      });
    }
  };

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
        field: "transportStrategyName",
        title: "Редакция ТС",
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
        field: "scenarioName",
        title: "Вариант реализации стратегии",
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
        field: "costTypeName",
        title: "Вид вложений",
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
        field: "directionName",
        title: "Направление вложений",
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
        field: "fundingSourceName",
        title: "Источник финансирования",
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
        field: "stageName",
        title: "Период реализации стратегии",
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
        field: "planingMin",
        title: "Минимальное ресурсное обеспечение, млрд. руб.",
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
        field: "planingMax",
        title: "Максимальное ресурсное обеспечение, млрд. руб.",
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

    const actions = [
      {
        icon: "edit",
        tooltip: "Редактировать",
        onClick: (event, rowData) => {
          if (this.state.initialized) this.toggleModal(rowData, "edit");
        },
      },
    ];

    return (
      <React.Fragment>
        <TableContainerWithFilters
          columns={columns}
          tableRef={this.tableRef}
          title={"Ресурсное обеспечение ТС (план)"}
          baseUrl={"views/k-4-s"}
          actions={actions}
          filtersList={this.state.filtersList}
          loadAll={true}
        />
        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
            <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
            <MDBModalBody>
              <ResourcesEdit data={this.state.row} tableRef={this.tableRef} toggleModal={this.toggleModal} />
            </MDBModalBody>
          </MDBModal>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
