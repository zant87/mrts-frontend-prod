import React from 'react';
import TableContainer from "../../../_components/TableContainer"
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import FactEdit from "./FactEdit";

export default class OperatorReportFactPage extends React.Component {

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
            {field: 'id', title: '#', filtering: false},
            {field: 'dataProviderName', title: 'Источник данных'},
            {field: 'transportTypeName', title: 'Вид транспорта'},
            {field: 'formCode', title: 'Форма'},
            {field: 'parameterName', title: 'Показатель'},
            {field: 'year', title: 'Отчетный год', filtering: false},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false},
            {field: 'okeiName', title: 'Единица измерения'},
            {field: 'value', title: 'Значение показателя', filtering: false},
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
                    title={'Фактические значения показателей'}
                    baseUrl={'views/k-5-s'}
                    actions={actions}
                    tableRef={this.tableRef}
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
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
