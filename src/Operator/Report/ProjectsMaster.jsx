import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import {history} from "@/_helpers";
import TableContainer from "../../_components/TableContainer";
import FinancingEdit from "./Financing/FinancingEdit";
import ProjectsMasterEdit from "./ProjectsMaster/ProjectsMasterEdit";

export default class OperatorReportProjectsMasterPage extends React.Component {

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

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'projectCode', title: 'Обозначение проекта'},
            {field: 'projectName', title: 'Содержание проекта'},
            {field: 'directionName', title: 'Вид транспорта'},
            {field: 'done', title: 'Уровень технической готовности', filtering: false},
            {field: 'planBeginYear', title: 'Сроки реализации плановые', filtering: false},
            {field: 'factStarted', title: 'Начало фактической реализации', filtering: false},
            {field: 'factFinished', title: 'Конец фактической реализации', filtering: false},
            {field: 'realPlanCost', title: 'Общие затраты (плановые)', filtering: false},
            {field: 'fact', title: 'Общие затраты (факт)', filtering: false},
            {field: 'description', title: 'Фактические результаты'},
        ];

        const filtersList = {
            'yearNumber': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Отчет о выполнении крупных инвестиционных проектов'}
                    filtersList={filtersList}
                    baseUrl={'views/k-7-masters'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="fluid">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ProjectsMasterEdit
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
