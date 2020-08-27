import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import TableContainer from "../../../Containers/TableContainer";
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
            {field: 'year', title: 'Отчетный год'},
            {field: 'directionName', title: 'Направление расходов'},
            {field: 'fundingName', title: 'Источник финансирования'},
            {field: 'costTypeName', title: 'Вид расходов'},
            {field: 'plan', title: 'Запланировано, млн. руб.'},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.'},
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

        const filtersList = {
            'year': 'numeric',
            'plan': 'numeric',
            'fact': 'numeric',
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Ресурсное обеспечение'}
                    baseUrl={'views/k-9-s'}
                    actions={actions}
                    filtersList={filtersList}
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
