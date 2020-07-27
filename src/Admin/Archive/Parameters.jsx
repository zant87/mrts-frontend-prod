import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveParametersPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'year', title: 'Отчетный год', filtering: false},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true},
            {field: 'okudName', title: 'ОКУД', filtering: true},
            {field: 'parameterName', title: 'Показатель', filtering: true},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true},
            {field: 'dataProviderCode', title: 'Источник', filtering: true},
            {field: 'value', title: 'Значение показателя', filtering: false},
            {field: 'okeiName', title: 'Единица измерений'},
        ];

    return (
        <React.Fragment>
            <TableContainer
                columns={columns}
                title={'Архив показателей для расчета индикаторов ТС'}
                baseUrl={'views/i-1-s'}
                loadAll={true}
            />
        </React.Fragment>
    );
  }
}
