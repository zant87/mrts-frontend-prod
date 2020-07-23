import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import TableContainer from "../../../_components/TableContainer";
import AppropriationsEdit from "./AppropriationsEdit";

export default class OperatorReportAppropriationsPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true
    };

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    render() {

        const columns = [
            {field: 'year', title: 'Отчетный год', filtering: false},
            {field: 'directionName', title: 'Направление расходов'},
            {field: 'fundingName', title: 'Источник финансирования'},
            {field: 'costTypeName', title: 'Вид расходов'},
            {field: 'plan', title: 'Запланировано, млн. руб.', filtering: false},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.', filtering: false},
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
                <TableContainer
                    columns={columns}
                    title={'Бюджетные ассигнования в рамках программ развития транспорта'}
                    baseUrl={'views/k-9-s'}
                    actions={actions}
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
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        );
    }
}
