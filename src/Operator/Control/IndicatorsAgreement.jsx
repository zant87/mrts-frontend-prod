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
        currentUserOnly: false,
        initialized: false,
        icon: 'check_circle_outline'
    };

    getUser = (id) => appAxios.get(`users?username.equals=${id}`).catch(err => null);
    getIndicators = () => appAxios.get(`indicators`).catch(err => null);

    async componentDidMount() {
        try {

            const [rUser, rIndicators] = await Axios.all([
                this.getUser(authenticationService.currentUserValue.id),
                this.getIndicators(),
            ]);

            console.log('%cUser =', 'color: green', {...rUser.data[0]});

            this.setState(
                {
                    currentUser: authenticationService.currentUserValue,
                    user: rUser.data[0],
                    indicators: rIndicators.data,
                    initialized: true
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
            {
                field: 'id', title: '#', filtering: false,
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'indicatorYear', title: 'Год',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'indicatorQuarter', title: 'Квартал', cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'indicatorName', title: 'Индикатор', cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'nationalSymbolicName', title: 'Единица измерения',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'agreeList', title: 'Требуется согласование',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'agreeUndone', title: 'Не согласован',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'approveList', title: 'Требует утверждения',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'indicatorValue', title: 'Значение индикатора',
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {
                field: 'approved', title: 'Утвержден', lookup: {0: 'Нет', 1: 'Да'},
                cellStyle: (e, rowData) => {
                    if ((rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
                        return {background: "#33cc33"};
                    }
                },
            },
            {field: 'userComment', title: 'Комментарий'}
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
            {
                icon: this.state.icon,
                tooltip: 'Свои согласования',
                onClick: (event, rowData) => {
                    let icon = 'check_circle_outline';
                    if (!this.state.currentUserOnly)
                        icon = 'check_circle';
                    this.setState({currentUserOnly: !this.state.currentUserOnly, icon: icon});
                    this.tableRef.current.onQueryChange();
                },
                isFreeAction: true
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
                        baseUrl={`views/indicator-agrees?filterByUser=${this.state.currentUserOnly}&username=${this.state.user.username}`}
                        modifiedBaseUrl={true}
                        loadAll={true}
                    />
                )}
            </React.Fragment>
        )
    }

};
