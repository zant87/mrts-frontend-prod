import React from 'react';
import TableContainer from "../../Containers/TableContainer";

export default class AdminStructureGoalsPage extends React.Component {

    render() {

        const columns = [
            {field: 'transportStrategyName', title: 'Редакция', defaultGroupOrder: 0},
            {field: 'goalName', title: 'Цель', defaultGroupOrder: 1},
            {field: 'taskName', title: 'Задача'}
        ];

        const options = {
            grouping: true,
            search: false,
            pageSize: 100,
            pageSizeOptions: [20, 50, 100],
            tableLayout: 'fixed'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Дерево целей и задач'}
                    baseUrl={'views/z-2-s'}
                    options={options}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
