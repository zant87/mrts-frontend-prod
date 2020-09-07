import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class AdminArchiveActivitiesPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false, editable: 'never'},
            {field: 'activityCode', title: 'Код', filtering: true, editable: 'never'},
            {field: 'activityName', title: 'Содержание мероприятия', filtering: true, editable: 'never'},
            {field: 'activityDocumentType', title: 'Тип документа', filtering: true, editable: 'never'},
            {field: 'activityExecutors', title: 'Исполнитель', filtering: true, editable: 'never'},
            {field: 'beginDate', title: 'Дата изменения записи', filtering: true, type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия записи', filtering: true, type: 'date'},
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
                    title={'Архив отчетов исполнителей по выполнению мероприятий по реализации транспортной стратегии'}
                    baseUrl={'views/i-3-s'}
                    filtersList={filtersList}
                    loadAll={true}
                />
        </React.Fragment>
    );
  }
}
