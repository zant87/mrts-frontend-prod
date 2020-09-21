import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import TableContainer from "../../../Containers/TableContainer";
import AppropriationsEdit from "./AppropriationsEdit";
import NumericFilter from "../../../Common/Filters/NumericFilter";
import StringFilter from "../../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../../Containers/TableContainerWithFilters";

export default class OperatorReportAppropriationsPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        filtersList: {
            year: {
                type: "integer",
                operator: "equals",
                value: null
            },
            directionName: {
                type: "text",
                operator: "contains",
                value: null
            },
            fundingName: {
                type: "text",
                operator: "contains",
                value: null
            },
            costTypeName: {
                type: "text",
                operator: "contains",
                value: null
            },
            plan: {
                type: "numeric",
                operator: "equals",
                value: null
            },
            fact: {
                type: "numeric",
                operator: "equals",
                value: null
            },
        }
    }

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        if (rowData && action) {
            this.setState({
                modal: !this.state.modal,
                row: rowData,
                action: action
            });
        } else {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

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
                field: 'year', title: 'Отчетный год', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'directionName', title: 'Направление расходов', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
            },
            {
                field: 'fundingName', title: 'Источник финансирования', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
            },
            {
                field: 'costTypeName', title: 'Вид расходов', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'plan', title: 'Запланировано, млн. руб.', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'fact', title: 'Кассовое исполнение, млн. руб.', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },
        ];

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={'Ресурсное обеспечение'}
                    baseUrl={'views/k-9-s'}
                    actions={actions}
                    filtersList={this.state.filtersList}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <AppropriationsEdit
                                data={this.state.row}
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
