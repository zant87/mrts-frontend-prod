import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class OperatorPlanProjectsPage extends React.Component {

    render() {
        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'projectCode', title: 'Обозначение проекта'},
            {field: 'projectName', title: 'Проект'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии'},
            {field: 'cost', title: 'Общие затраты млрд. руб', filtering: false},
            {field: 'workStage', title: 'Стадия работ', filtering: false},
            {field: 'geolink', title: 'Географическая привязка'},
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Крупные инвестиционные проекты'}
                    baseUrl={'views/k-3-s'}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
