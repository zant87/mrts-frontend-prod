import React from 'react';
import TableContainer from "../../_components/TableContainer";

export default class OperatorControlIndicatorsAgreementPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'indicatorYear', title: 'Год', type: 'numeric'},
            {field: 'indicatorQuarter', title: 'Квартал'},
            {field: 'indicatorName', title: 'Индикатор'},
            {field: 'nationalSymbolicName', title: 'Единица измерения'},
            {field: 'agreeList', title: 'Требуется согласование (agreeList)'},
            {field: 'agreeUndone', title: 'Не согласован (agreeUndone)'},
            {field: 'approveList', title: 'Утвержден (approveList)'},
        ];

        const filtersList = {
            'year': 'equals',
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Согласование индикаторов ТС'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    baseUrl={'views/indicator-agrees'}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }

};
