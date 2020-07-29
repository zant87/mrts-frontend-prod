import React from 'react';
import MUIDataTable from "mui-datatables";
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdbreact";
import {labels} from "../../_components/TableTextLabels";
import TableContainer from "../../_components/TableContainer";

export default class OperatorControlCompletionPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'parameterCode', title: 'Код параметра'},
            {field: 'parameterName', title: 'Наименование параметра'},
            {field: 'year', title: 'Отчетный год', type: 'number'},
            {field: 'quarterName', title: 'Отчетный квартал'},
            {field: 'dataSource', title: 'Источники данных'},
            {field: 'control', title: 'Наличие данных', type: 'number', filtering: false},
        ];

        const filtersList = {
            'year': 'equals',
            'control': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль поступления и согласования данных по показателям для расчета индикаторов ТС'}
                    baseUrl={'views/control-parameter-data'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
