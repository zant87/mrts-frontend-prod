import React from 'react';
import TableContainer from "../../_components/TableContainer";
import {authenticationService} from "../../_services";

export default class OperatorControlIndicatorsAgreementPage extends React.Component {

    state = {
        currentUser: null,
        initialized: false
    };

    componentDidMount() {
        authenticationService.currentUser.subscribe((x) =>
            this.setState({
                currentUser: x,
                initialized: true
            })
        );
    }

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
                {this.state.initialized && (
                    <TableContainer
                        columns={columns}
                        title={'Согласование индикаторов ТС'}
                        filtersList={filtersList}
                        filterMinimalLength={filterMinimalLength}
                        baseUrl={`views/indicator-agrees?agreeIdList.contains=userid_operator`}
                        modifiedBaseUrl={true}
                        loadAll={true}
                    />
                )}
            </React.Fragment>
        )
    }

};
