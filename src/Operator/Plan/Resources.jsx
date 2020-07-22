import React from 'react';
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import TableContainer from "../../_components/TableContainer";
import ResourcesEdit from "./ResourcesEdit";

export default class OperatorPlanResourcesPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true
    }

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyCode', title: 'Редакция ТС'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии'},
            {field: 'costTypeName', title: 'Вид вложений'},
            {field: 'directionName', title: 'Направление вложений'},
            {field: 'fundingSourceName', title: 'Источник финансирования'},
            {field: 'stageName', title: 'Период реализации стратегии', filtering: false},
            {field: 'planingMin', title: 'Минимальное ресурсное обеспечение, млрд. руб.', filtering: false},
            {field: 'planingMax', title: 'Максимальное ресурсное обеспечение, млрд. руб.', filtering: false},
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Ресурсное обеспечение ТС (план)'}
                    baseUrl={'views/k-4-s'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ResourcesEdit
                                data={this.state.row}
                                tableRef={this.tableRef}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>

        )
    }
};
