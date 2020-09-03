import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class AdminArchiveParametersPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true},
            {field: 'okudName', title: 'ОКУД', filtering: true},
            {field: 'parameterName', title: 'Показатель', filtering: true},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true},
            {field: 'dataProviderCode', title: 'Источник', filtering: true},
            {field: 'value', title: 'Значение показателя', filtering: false},
            {field: 'beginDate', title: 'Дата изменения записи', filtering: true, type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия записи', filtering: false, type: 'date'},
            {field: 'okeiName', title: 'Единица измерений'},
        ];

        const filtersList = {
            'year': 'equals'
        };

        const options = this.props.options ? this.props.options : {
            pageSize: 20,
            pageSizeOptions: [20, 50, 100],
            actionsColumnIndex: 999,
            filtering: true,
            search: false,
            columnsButton: true
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив показателей для расчета индикаторов ТС'}
                    baseUrl={'views/i-1-s'}
                    options={options}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
