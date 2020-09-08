import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import {authenticationService} from "../../_services";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {toast} from "mdbreact";
import moment from "moment";

export default class OperatorControlIndicatorsAgreementPage extends React.Component {

    state = {
        currentUser: null,
        initialized: false
    };

    getUser = (id) => appAxios.get(`users?username.equals=${id}`).catch(err => null);
    getIndicators = () => appAxios.get(`indicators`).catch(err => null);

    async componentDidMount() {
        try {

            const [rUser, rIndicators] = await Axios.all([
                this.getUser(authenticationService.currentUserValue.id),
                this.getIndicators(),
            ]);

            console.log('%cUser =', 'color: green', rUser.data[0]);

            this.setState(
                {
                    user: rUser.data[0],
                    indicators: rIndicators.data,
                    initialized: true,
                    currentUser: authenticationService.currentUserValue
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    cancelAgreement = (rowData) => {

        const date = moment().format('YYYY-MM-DD');
        console.log(rowData);

        if (rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) {
            appAxios({
                url: `document-agreements?documentId.equals=${rowData.documentId}&executorId.equals=${this.state.user.id}&endDate.equals=2099-12-31`,
                method: 'GET',
            }).then((response) => {

                const data = {...response.data[0], endDate: date};
                console.log('Data to PUT into document-agreements =', data);

                appAxios({
                    url: `document-agreements`,
                    method: 'PUT',
                    data: data
                }).then((response) => {
                    toast.success(`Согласование успешно отозвано`, {closeButton: false});
                    this.tableRef.current.onQueryChange();
                })
            })
        }

        if (rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {

            appAxios({
                url: `document-agreements?documentId.equals=${rowData.documentId}&executorId.equals=${this.state.user.id}&endDate.equals=2099-12-31`,
                method: 'GET',
            }).then((response) => {

                console.log('document-agreements GET response =', response.data);

                const data = {...response.data[0], endDate: date};
                console.log('Data to PUT into document-agreements =', data);

                appAxios({
                    url: `document-agreements`,
                    method: 'PUT',
                    data: data
                }).then((response) => {
                    toast.success(`Утверждение успешно отозвано`, {closeButton: false});
                    this.tableRef.current.onQueryChange();
                })
            })
        }
    };

    approveAgreement = (rowData) => {

        const date = moment().format('YYYY-MM-DD');
        let role = null;

        if (rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) {
            role = 'AGREE';

            const data = {
                "agreementRole": role,
                "beginDate": date,
                "endDate": "2099-12-31",
                "executorId": this.state.user.id,
                "documentId": rowData.documentId,
            };

            console.log('Data to POST into document-agreements =', data);

            appAxios({
                url: `document-agreements`,
                method: 'POST',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Согласование успешно создано для ID ${message}`, {closeButton: false});
                this.tableRef.current.onQueryChange();
            });
        }

        if (rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
            role = 'APPROVE';

            const data = {
                "agreementRole": role,
                "beginDate": date,
                "endDate": "2099-12-31",
                "executorId": this.state.user.id,
                "documentId": rowData.documentId,
            };

            console.log('Data to POST into document-agreements =', data);

            appAxios({
                url: `document-agreements`,
                method: 'POST',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Утверждение успешно создано для ID ${message}`, {closeButton: false});
                this.tableRef.current.onQueryChange();
            });
        }
    };

    tableRef = React.createRef();

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'indicatorYear', title: 'Год'},
            {field: 'indicatorQuarter', title: 'Квартал'},
            {field: 'indicatorName', title: 'Индикатор'},
            {field: 'nationalSymbolicName', title: 'Единица измерения'},
            {field: 'agreeList', title: 'Требуется согласование'},
            {field: 'agreeUndone', title: 'Не согласован'},
            {field: 'approveList', title: 'Требует утверждения'},
            {field: 'indicatorValue', title: 'Значение индикатора'},
            {field: 'approved', title: 'Утвержден', lookup: {0: 'Нет', 1: 'Да'}}
        ];

        const filtersList = {
            'indicatorYear': 'numeric',
            'approved': 'equals'
        };

        const filterMinimalLength = 1;

        const actions = [
            {
                icon: 'check',
                tooltip: 'Согласовать',
                onClick: (event, rowData) => {
                    this.approveAgreement(rowData);
                }
            },
            {
                icon: 'cancel',
                tooltip: 'Отозвать согласование',
                onClick: (event, rowData) => {
                    this.cancelAgreement(rowData);
                }
            },
        ];

        return (
            <React.Fragment>
                {this.state.initialized && (
                    <TableContainer
                        columns={columns}
                        title={'Согласование индикаторов ТС'}
                        filtersList={filtersList}
                        actions={actions}
                        tableRef={this.tableRef}
                        filterMinimalLength={filterMinimalLength}
                        baseUrl={`views/indicator-agrees`}
                        loadAll={true}
                    />
                )}
            </React.Fragment>
        )
    }

};
