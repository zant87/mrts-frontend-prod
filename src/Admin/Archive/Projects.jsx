import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveProjectsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'projectName', title: 'Имя проекта', filtering: true, editable: 'never'},
            {field: 'planBeginYear', title: 'Год начала'},
            {field: 'planEndYear', title: 'Год окончания'},
            {field: 'planCost', title: 'План', filtering: false, editable: 'never'},
            {field: 'reportFactCost', title: 'Отчетный факт', filtering: false, editable: 'never'},
            {field: 'factCost', title: 'Факт', filtering: false, editable: 'never'},
            {field: 'beginDate', title: 'Дата изменения записи', filtering: false, type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия записи', filtering: false, type: 'date'},
        ];

        const filtersList = {
            'year': 'equals',
            'planBeginYear': 'equals',
            'planEndYear': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив отчетов исполнителей по выполнению крупных инвестпроектов'}
                    baseUrl={'views/i-4-s'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
