import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class OperatorControlCompletionPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'goalName', title: 'Цель'},
            {field: 'goalDescription', title: 'Описание цели'},
            {field: 'indicatorCode', title: 'Код индикатора'},
            {field: 'indicatorDescription', title: 'Описание индикатора'},
            {field: 'year', title: 'Отчетный год', type: 'number'},
            {field: 'quarterName', title: 'Отчетный квартал'},
            {field: 'missing', title: 'Перечень отсутствующих показателей'},
            {field: 'control', title: 'Полнота исходных данных', type: 'number'},
        ];

        const filtersList = {
            'year': 'equals',
            'control': 'equals'
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль поступления и согласования данных по показателям для расчета индикаторов ТС'}
                    baseUrl={'views/control-indicator-inputs'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
