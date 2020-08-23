import React from 'react';
import TableContainer from "../../_components/TableContainer";
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

        const indicator = this.state.indicators.filter(x => x.id === rowData.indicatorId)[0];

        appAxios({
            url: `document-agreement-settings?documentTypeId.equals=${indicator.documentTypeId}&executorId.equals=${this.state.user.id}&endDate.equals=2099-12-31`,
            method: 'GET',
        }).then((response) => {
            const agreement = response.data[0];
            console.log(agreement);
            let check = false;
            let role = null;

            if (agreement.role === 'AGREE') {
                check = rowData.agreeIdDone && rowData.agreeIdDone.includes(this.state.user.username);
                role = 'AGREE';
            } else {
                check = rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username);
                role = 'APPROVE';
            }

            if (!check) {
                toast.warning(`Согласование или утверждение уже отозвано или не существует`, {closeButton: false});
            } else {
                appAxios({
                    url: `document-agreements?documentId.equals=${rowData.documentId}&executorId.equals=${this.state.user.id}&endDate.equals=2099-12-31`,
                    method: 'GET',
                }).then((response) => {
                    // console.log(response.data[0]);
                    const data = response.data[0];
                    const date = moment();
                    data.endDate = date.format('YYYY-MM-DD');
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
        })
    };

    approveAgreement = (rowData) => {

        const indicator = this.state.indicators.filter(x => x.id === rowData.indicatorId)[0];

        appAxios({
            url: `document-agreement-settings?documentTypeId.equals=${indicator.documentTypeId}&executorId.equals=${this.state.user.id}&endDate.equals=2099-12-31`,
            method: 'GET',
        }).then((response) => {
            const agreement = response.data[0];
            console.log(agreement);
            let check = false;
            let role = null;

            if (agreement.role === 'AGREE') {
                check = rowData.agreeIdDone && rowData.agreeIdDone.includes(this.state.user.username);
                role = 'AGREE';
            } else {
                check = rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username);
                role = 'APPROVE';
            }

            if (check) {
                toast.warning(`Согласование или утверждение уже выполнено`, {closeButton: false});
            } else {
                const date = moment();
                const data = {
                    "agreementRole": role,
                    "beginDate": date.format('YYYY-MM-DD'),
                    "endDate": "2099-12-31",
                    "executorId": this.state.user.id,
                    "documentId": rowData.documentId,
                };
                console.log('Data =', data);
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
        });
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
            {field: 'approveList', title: 'Утвержден'},
        ];

        const filtersList = {
            'indicatorYear': 'numeric',
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
                        baseUrl={`views/indicator-agrees?agreeIdList.contains=userid_operator`}
                        modifiedBaseUrl={true}
                        loadAll={true}
                    />
                )}
            </React.Fragment>
        )
    }

};
