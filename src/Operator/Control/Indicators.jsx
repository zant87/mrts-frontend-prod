import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class OperatorControlIndicatorsPage extends React.Component {

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
            {field: 'missing', title: 'Перечень отсутствующих параметров'},
            {field: 'control', title: 'Полнота исходных данных', type: 'number', filtering: false},
        ];

        const filtersList = {
            'year': 'equals',
            'control': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль выполнения и согласования расчета индикаторов ТС'}
                    baseUrl={'views/control-inticator-inputs'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
