import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import TableContainer from "../../../Containers/TableContainer";
import ExtraBudgetEdit from "./ExtraBudgetEdit";

export default class OperatorReportExtraBudgetTablePage extends React.Component {

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
            {field: 'id', title: '#', filtering: false, type: 'number'},
            {field: 'year', title: 'Отчетный год', type: 'number'},
            {field: 'directionName', title: 'Направление расходов', editable: 'never'},
            {field: 'costTypeName', title: 'Вид расходов', editable: 'never'},
            {field: 'fact', title: 'Фактические объемы исполнения, млн. руб.', filtering: false, type: 'number'},
            {field: 'plan', title: 'Плановые объемы исполнения, млн. руб.', filtering: false, type: 'number'}
        ];

        const filtersList = {
            'year': 'equals'
        };

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
                    title={'Объемы привлечения внебюджетных средств'}
                    baseUrl={'views/k-10-s'}
                    actions={actions}
                    filtersList={filtersList}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ExtraBudgetEdit
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
