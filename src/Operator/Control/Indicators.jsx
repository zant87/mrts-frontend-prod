import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class OperatorControlIndicatorsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'parameterCode', title: 'Код показателя'},
            {field: 'parameterName', title: 'Наименование показателя'},
            {field: 'year', title: 'Отчетный год', type: 'number'},
            {field: 'quarterName', title: 'Отчетный квартал'},
            {field: 'dataSource', title: 'Источники данных'},
            {field: 'control', title: 'Наличие данных', type: 'number'},
            {field: 'responsible', title: 'Ответственное лицо'}
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
                    title={'Контроль выполнения и согласования расчета индикаторов ТС'}
                    baseUrl={'views/control-parameter-data'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }

};
