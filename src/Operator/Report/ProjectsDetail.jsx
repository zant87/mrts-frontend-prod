import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, toast} from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import TableContainer from "../../_components/TableContainer";

export default class OperatorReportProjectsDetailPage extends React.Component {

    render() {

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'projectCode', title: 'Обозначение проекта', editable: false},
            {field: 'projectName', title: 'Содержание проекта', editable: false},
            {field: 'costTypename', title: 'Вид расходов', editable: false},
            {field: 'fundSourceName', title: 'Источник финансирования', editable: false},
            {field: 'plan', title: 'Предусмотрено на год', filtering: false},
            {field: 'spent', title: 'Освоено на год', filtering: false},
            {field: 'fact', title: 'Кассовые расходы за год', filtering: false},
        ];

        const filtersList = {
            'yearNumber': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Финансирование проектов ТС (detail)'}
                    baseUrl={'views/k-7-details'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
