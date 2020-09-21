import React from "react";
import {MDBContainer, MDBModal, MDBModalHeader, MDBModalBody} from "mdbreact";
import {authenticationService} from "../../_services";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import OpeatorReportActualIndicatorsEditPage from "./ActualIndicators/ActualIndicatorsEdit";

export default class OperatorActualIndicatorsExtendedPage extends React.Component {
  state = {
    page: 0,
    count: 0,
    data: [],
    isLoading: false,
    username: "",
    modal: false,
    row: {},
    filtersList: {
      id: {
        type: "integer",
        operator: "equals",
        value: null
      },
      indicatorCodeShort: {
        type: "text",
        operator: "contains",
        value: null
      },
      indicatorName: {
        type: "text",
        operator: "contains",
        value: null
      },
      scenarioName: {
        type: "text",
        operator: "contains",
        value: null
      },
      okeiName: {
        type: "text",
        operator: "contains",
        value: null
      },
      valueTypeName: {
        type: "text",
        operator: "contains",
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
      transportTypeName: {
        type: "text",
        operator: "contains",
        value: null
      },
      username: {
        type: "text",
        operator: "contains",
        value: null
      },
      calcScript: {
        type: "text",
        operator: "contains",
        value: null
      },
      indicatorValue: {
        type: "numeric",
        operator: "equals",
        value: null
      },
    }
  };
  tableRef = React.createRef();

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
        this.setState({
          username: x.id,
        })
    );
  }

  updateFilter = (e) => {
    console.log('Update Filter received =', e);
    let newFilter = this.state.filtersList;
    newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
    console.log('New Filter =', newFilter);
    this.setState({filtersList: newFilter});
  }

  toggleModal = (rowData, action) => {
    this.setState({
      row: rowData,
      modal: !this.state.modal,
      action: action
    });
  }

  render() {

    const actions = [
      {
        icon: 'edit',
        tooltip: 'Редактировать',
        onClick: (event, rowData) => {
          console.log('Editing row =', rowData);
          this.toggleModal(rowData, 'edit');
        }
      },
    ];

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
        field: "indicatorCodeShort", title: "Код", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "indicatorName", title: "Наименование", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "scenarioName", title: "Сценарий", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "okeiName", title: "Единица измерения", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "valueTypeName", title: "Тип значения", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "year", title: "Год", filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "quarterName", title: "Квартал", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "transportTypeName", title: "Вид транспорта", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "username", title: "Ответственный", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "calcScript", title: "Результаты расчета", filtering: true,
        filterComponent: props => {
          return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                               filter={this.state.filtersList[props.columnDef.field]}
                               filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
      {
        field: "indicatorValue",
        title: "Значение",
        type: "numeric",
        editable: "always",
        filtering: true,
        filterComponent: props => {
          return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                filter={this.state.filtersList[props.columnDef.field]}
                                filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
        }
      },
    ];

    return (
        <React.Fragment>
          <TableContainerWithFilters
              columns={columns}
              title={"Индикаторы за отчетный период"}
              baseUrl={"views/actual-indicator-ext"}
              filtersList={this.state.filtersList}
              actions={actions}
              tableRef={this.tableRef}
              loadAll={true}
          />
          <MDBContainer>
            <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true} size={'lg'}>
              <MDBModalHeader toggle={this.toggleModal}>Редактирование</MDBModalHeader>
              <MDBModalBody>
                <OpeatorReportActualIndicatorsEditPage
                    action={this.state.action}
                    data={this.state.row}
                    tableRef={this.tableRef}
                    username={this.state.username}
                    toggleModal={this.toggleModal}/>
              </MDBModalBody>
            </MDBModal>
          </MDBContainer>
        </React.Fragment>
    );
  }
}
