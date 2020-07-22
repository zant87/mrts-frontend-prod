import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class OperatorPlanActivitiesPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyCode', title: 'Код ТС'},
            {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'activityCode', title: 'Обозначение мероприятия'},
            {field: 'activityDescription', title: 'Содержание мероприятия'},
            {field: 'documentType', title: 'Вид документа'},
            {field: 'yearBegin', title: 'Начало реализации', filtering: false},
            {field: 'yearEnd', title: 'Конец реализации', filtering: false},
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Мероприятия по реализации ТС'}
                    baseUrl={'views/k-2-s'}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
