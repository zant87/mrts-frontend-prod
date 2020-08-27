import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class OperatorControlProjectsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'scenarioName', title: 'Сценарий'},
            {field: 'projectName', title: 'Наименование проекта'},
            {field: 'projectNum', title: 'Номер проекта', filtering: false},
            {field: 'beginYear', title: 'Начало выполнения проекта'},
            {field: 'endYear', title: 'Окончание выполнения проекта'},
            {field: 'year', title: 'Отчетный год'},
            {field: 'controlReport', title: 'Наличие отчета по мероприятию', type: 'number'},
            {field: 'controlResidual', title: 'Наличие отчета по мероприятию', type: 'number'},
        ];

        const filtersList = {
            'year': 'equals',
            'beginYear': 'equals',
            'endYear': 'equals',
            'controlReport': 'equals',
            'controlResidual': 'equals'
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль поступления и согласования данных по выполнению крупных инвестиционных проектов'}
                    baseUrl={'views/control-project-reportsList'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
