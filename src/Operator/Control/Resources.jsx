import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class OperatorControlResourcesPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'directionName', title: 'Направление расхода'},
            {field: 'year', title: 'Отчетный год'},
            {
                field: 'controlFederation',
                title: 'Наличие отчета по финансированию из Федерального бюджета',
                type: 'number'
            },
            {
                field: 'controlRegional',
                title: 'Наличие отчета по финансированию из бюджетов субъектов России',
                type: 'number'
            },
            {
                field: 'controlOther',
                title: 'Наличие отчета по финансированию из внебюджетных источников',
                type: 'number'
            },
        ];

        const filtersList = {
            'year': 'equals',
            'controlFederation': 'equals',
            'controlRegional': 'equals',
            'controlOther': 'equals'
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Контроль поступления и согласования данных по выполнению ресурсного обеспечения'}
                    baseUrl={'views/control-budget-reports'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
