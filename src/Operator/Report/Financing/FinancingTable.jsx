import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, MDBSpinner, toast} from "mdbreact";
import TableContainer from "../../../_components/TableContainer";
import FinancingEdit from "./FinancingEdit";

export default class OperatorReportFinancingPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true
    }

    toggleModal = (rowData, action) => {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    tableRef = React.createRef();

    render() {


        const columns = [
            {field: 'year', title: 'Отчетный год', filtering: false},
            {field: 'expenditureName', title: 'Направление расходов'},
            {field: 'plan', title: 'Запланировано, млн. руб.', filtering: false},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.', filtering: false},
        ];


        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    console.log(rowData);
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Бюджетное финансирование транспорта'}
                    baseUrl={'views/k-8-s'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <FinancingEdit
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
