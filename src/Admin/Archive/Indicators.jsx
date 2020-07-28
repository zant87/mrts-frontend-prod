import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveIndicatorsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false},
            {field: 'indicatorName', title: 'Показатель', filtering: true},
            {field: 'scenarioName', title: 'Сценарий', filtering: true},
            {field: 'okeiCode', title: 'ОКЕИ', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true},
            {field: 'beginDate', title: 'Начало периода', filtering: false, type: 'date'},
            {field: 'endDate', title: 'Конец периода', filtering: false, type: 'date'},
            {field: 'value', title: 'Значение показателя', filtering: false},
        ];

        const filtersList = {
            'year': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив расчета индикаторов ТС'}
                    baseUrl={'views/i-2-s'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
