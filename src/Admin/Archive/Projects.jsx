import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminArchiveProjectsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: false, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'projectName', title: 'Имя проекта', filtering: true, editable: 'never'},
            {field: 'planBeginYear', title: 'Год начала', filtering: false},
            {field: 'planEndYear', title: 'Год окончания', filtering: false},
            {field: 'planCost', title: 'План', filtering: false, editable: 'never'},
            {field: 'reportFactCost', title: 'Отчетный факт', filtering: false, editable: 'never'},
            {field: 'factCost', title: 'Факт', filtering: false, editable: 'never'},
            {field: 'beginDate', title: 'Начало периода', filtering: false, type: 'date'},
            {field: 'endDate', title: 'Конец периода', filtering: false, type: 'date'},
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив выполнения крупных инвестиционных проектов'}
                    baseUrl={'views/i-4-s'}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
