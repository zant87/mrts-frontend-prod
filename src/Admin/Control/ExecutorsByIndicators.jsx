import React from 'react';
import TableContainer from "../../_components/TableContainer";
import appAxios from "../../_services/appAxios";
import {toast} from "mdbreact";
import moment from "moment";

export default class AdminExecutorsByIndicatorPage extends React.Component {

    state = {
        modal: false,
        row: {}
    }

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    cancelAgreement = (rowData) => {
        appAxios({
            url: `document-agreement-settings/${rowData.id}`,
            method: 'GET',
        }).then((response) => {
            const agreement = response.data;

            const date = moment();
            agreement.endDate = date.format('YYYY-MM-DD');

            console.log(agreement);

            appAxios({
                url: `document-agreement-settings`,
                method: 'PUT',
                data: agreement
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Согласование успешно отозвано для ID ${message}`, {closeButton: false});
                this.tableRef.current.onQueryChange();
            });
        });
    }

    render() {

        const actions = [
            {
                icon: 'cancel',
                tooltip: 'Отозвать согласование',
                onClick: (event, rowData) => {
                    this.cancelAgreement(rowData);
                }
            },
            {
                icon: 'add',
                tooltip: 'Добавить согласование',
                onClick: (event, rowData) => {
                    this.toggleModal(rowData);
                },
                isFreeAction: true
            }
        ];

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
                    tableRef={this.tableRef}
                    actions={actions}
                    baseUrl={'views/indicator-agree-settings'}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
