import React from 'react';
import TableContainer from "../../../Containers/TableContainer"
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import FactEdit from "./FactEdit";
import NumericFilter from "../../../Common/Filters/NumericFilter";
import StringFilter from "../../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../../Containers/TableContainerWithFilters";

export default class OperatorReportFactPage extends React.Component {


    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            dataProviderName: {
                type: "text",
                operator: "contains",
                value: null
            },
            transportTypeName: {
                type: "text",
                operator: "contains",
                value: null
            },
            formCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            parameterName: {
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
            okeiName: {
                type: "text",
                operator: "contains",
                value: null
            },
            value: {
                type: "numeric",
                operator: "equals",
                value: null
            }
        }
    }

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
    }

    toggleModal = (rowData, action) => {
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

    tableRef = React.createRef();

    render() {

        const columns = [
            {
                field: 'id', title: '#', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'dataProviderName', title: 'Источник данных', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'transportTypeName', title: 'Вид транспорта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'formCode', title: 'Форма', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'parameterName', title: 'Показатель', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'year', title: 'Отчетный год', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'quarterName', title: 'Отчетный квартал', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'okeiName', title: 'Единица измерения', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'value', title: 'Значение показателя',
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
                    title={'Фактические значения показателей'}
                    baseUrl={'views/k-5-s'}
                    actions={actions}
                    tableRef={this.tableRef}
                    filtersList={this.state.filtersList}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <FactEdit
                                data={this.state.row}
                                action={this.state.action}
                                tableRef={this.tableRef}
                                toggleModal={this.toggleModal}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
