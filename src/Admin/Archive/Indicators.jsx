import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class AdminArchiveIndicatorsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false},
            {field: 'indicatorName', title: 'Индикатор', filtering: true},
            {field: 'scenarioName', title: 'Сценарий', filtering: true},
            {field: 'okeiCode', title: 'ОКЕИ', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true},
            {field: 'beginDate', title: 'Дата расчета (изменения) значения', type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия значения', type: 'date'},
            {field: 'value', title: 'Значение индикатора', filtering: false},
        ];

        const filtersList = {
            'year': 'equals',
            'beginDate': 'date',
            'endDate': 'date'
        };


        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив результатов расчета индикаторов ТС'}
                    baseUrl={'views/i-2-s'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
