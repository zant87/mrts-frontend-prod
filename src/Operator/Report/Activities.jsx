import React from 'react';
import TableContainer from "../../_components/TableContainer";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import ActivitiyEdit from "./Activities/ActivitiyEdit";

export default class OperatorReportActivitiesPage extends React.Component {

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
            {field: 'activityReportId', title: '#', filtering: false},
            {field: 'activityCode', title: 'Код мероприятия', filtering: false},
            {field: 'executor', title: 'Исполнитель'},
            {field: 'documentType', title: 'Вид документа'},
            {field: 'activityDescription', title: 'Содержание мероприятия'},
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false},
            {field: 'reportDescription', title: 'Описание'},
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
            'yearNumber': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Отчет по проекту'}
                    baseUrl={'views/k-6-s'}
                    actions={actions}
                    filtersList={filtersList}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ActivitiyEdit
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
