import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveParametersPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: false, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'okudName', title: 'ОКУД', filtering: true, editable: 'never'},
            {field: 'parameterName', title: 'Показатель', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true, editable: 'never'},
            {field: 'dataProviderCode', title: 'Источник', filtering: true, editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: false, editable: 'never'},
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
