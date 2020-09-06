import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class OperatorControlActivitiesPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'activityCode', title: 'Код мероприятия'},
            {field: 'activityName', title: 'Наименование мероприятия'},
            {field: 'year', title: 'Отчетный год'},
            {field: 'beginYear', title: 'Начало выполнения мероприятия'},
            {field: 'endYear', title: 'Окончание выполнения мероприятия'},
            {field: 'control', title: 'Наличие отчета по мероприятию', type: 'number'},
        ];

        const filtersList = {
            'year': 'equals',
            'beginYear': 'equals',
            'endYear': 'equals',
            'control': 'equals'
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль поступления и согласования данных по выполнению мероприятий по реализации ТС'}
                    baseUrl={'views/control-activity-reports'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
