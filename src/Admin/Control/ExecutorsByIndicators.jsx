import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class AdminExecutorsByIndicatorPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'indicatorName', title: 'Индикатор'},
            {field: 'role', title: 'Роль'},
            {field: 'fullname', title: 'Пользователь'},
            {field: 'beginDate', title: 'Начало действия', type: 'date', filtering: false},
            {field: 'endDate', title: 'Конец действия', type: 'date', filtering: false},
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Исполнители по индикаторам'}
                    baseUrl={'views/indicator-agree-settings'}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};


// export default AdminExecutorsByIndicatorPage;
