import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import {authenticationService} from "../../_services";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import moment from "moment";
import AgreementHistoryPage from "./IndicatorsAgreement/AgreementHistory";

export default class OperatorControlIndicatorsAgreementPage extends React.Component {

    state = {
        currentUser: null,
        currentUserOnly: false,
        initialized: false,
        icon: 'check_circle_outline',
        showHistory: false
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

    toggleHistory = (rowData) => {
        console.log(rowData);
        console.log(this.state);
        this.setState({
            document: rowData.documentId,
            showHistory: !this.state.showHistory
        });
    }

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

    checkAgreement = (rowData) => {
        return rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username) || rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username);
    }

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
            {
                field: 'check', title: 'Согласован',
                render: rowData => (this.checkAgreement(rowData) &&
                    <MDBIcon icon="thumbs-up" size="2x" className="green-text pr-3"/>), filtering: false
            },
            {
                field: 'approved', title: 'Утвержден', lookup: {0: 'Нет', 1: 'Да'},
                render: rowData => (rowData.approved === 1 ?
                    <MDBIcon icon="thumbs-up" size="2x" className="green-text pr-3"/> :
                    <MDBIcon icon="thumbs-down" size="2x" className="red-text pr-3"/>)
            }
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
                icon: 'history',
                tooltip: 'История согласований',
                onClick: (event, rowData) => {
                    this.toggleHistory(rowData);
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
                    <React.Fragment>
                        <TableContainer
                            columns={columns}
                            title={'Согласование индикаторов ТС'}
                            filtersList={filtersList}
                            actions={actions}
                            tableRef={this.tableRef}
                            filterMinimalLength={filterMinimalLength}
                            baseUrl={`views/indicator-agrees-by-user?filterByUser=${this.state.currentUserOnly}&username=${this.state.user.username}`}
                            modifiedBaseUrl={true}
                            loadAll={true}
                        />
                        <MDBModal isOpen={this.state.showHistory} toggle={this.toggleHistory} backdrop={true} size="lg">
                            <MDBModalHeader toggle={this.toggleHistory}>История согласований</MDBModalHeader>
                            <MDBModalBody>
                                <AgreementHistoryPage document={this.state.document}
                                                      username={this.state.currentUser.id}/>
                            </MDBModalBody>
                        </MDBModal>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
};
