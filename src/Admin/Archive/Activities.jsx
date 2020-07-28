import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveActivitiesPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: false, editable: 'never'},
            {field: 'activityCode', title: 'Код', filtering: true, editable: 'never'},
            {field: 'activityName', title: 'Мероприятие', filtering: true, editable: 'never'},
            {field: 'activityDocumentType', title: 'Тип документа', filtering: true, editable: 'never'},
            {field: 'activityExecutors', title: 'Исполнитель', filtering: true, editable: 'never'},
            {field: 'beginDate', title: 'Начало периода', filtering: false, type: 'date'},
            {field: 'endDate', title: 'Конец периода', filtering: false, type: 'date'},
        ];

        const filtersList = {
            'year': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив выполнения мероприятий по реализации ТС'}
                    baseUrl={'views/i-3-s'}
                    filtersList={filtersList}
                    loadAll={true}
                />
        </React.Fragment>
    );
  }
}
