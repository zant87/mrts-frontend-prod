import React from "react";
import appAxios from "../../_services/appAxios";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import Axios from "axios";
import IndicatorsEdit from "./IndicatorsEdit";
import { ruLocalization } from "@/_components";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class OperatorPlanIndicatorsPage extends React.Component {
  state = {
    modal: false,
    row: {},
    action: "",
    okeis: {},
    initialized: false,
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
      goalName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      indicatorName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      transportTypeName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      stageName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      okeiName: {
        type: "text",
        operator: "contains",
        value: null,
      },
      value: {
        type: "numeric",
        operator: "equals",
        value: null,
      },
    },
  };

  getOkeis = () => appAxios.get(`nsi-okeis`).catch((err) => null);
  tableRef = React.createRef();

  async componentDidMount() {
    try {
      const [rOkeis] = await Axios.all([this.getOkeis()]);

      this.setState({
        okeis: rOkeis.data,
        initialized: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

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

  tableRef = React.createRef();

  updateFilter = (e) => {
    console.log("Update Filter received =", e);
    let newFilter = this.state.filtersList;
    newFilter[e.id] = { value: e.value, operator: e.operator, type: e.type };
    console.log("New Filter =", newFilter);
    this.setState({ filtersList: newFilter });
  };

  render() {
    console.log("Локализация" + ruLocalization);

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
        field: "goalName",
        title: "Цель",
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
        field: "indicatorName",
        title: "Индикатор",
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
        field: "transportTypeName",
        title: "Вид транспорта",
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
        title: "Этап реализации стратегии",
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
        title: "Единица измерения",
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
        field: "value",
        title: "Значение индикатора",
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
          title={"Индикаторы ТС по целям и задачам (план)"}
          baseUrl={"views/k-1-s"}
          actions={actions}
          filtersList={this.state.filtersList}
          loadAll={true}
        />
        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
            <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
            <MDBModalBody>
              <IndicatorsEdit
                data={this.state.row}
                okeis={this.state.okeis}
                action={this.state.action}
                tableRef={this.tableRef}
                toggleModal={this.toggleModal}
              />
            </MDBModalBody>
          </MDBModal>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
