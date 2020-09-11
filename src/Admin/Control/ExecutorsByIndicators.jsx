import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import appAxios from "../../_services/appAxios";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import moment from "moment";
import Axios from "axios";
import ExecutorsByIndicatorEdit from "./ExecutorsByIndicatorEdit";

export default class AdminExecutorsByIndicatorPage extends React.Component {

    state = {
        modal: false,
        row: {},
        initialized: false
    }

    getUsers = () => appAxios.get(`users`).catch(err => null);
    getIndicators = () => appAxios.get(`indicators`).catch(err => null);

    async componentDidMount() {
        try {
            console.log('Props =', this.props);

            const [rUsers, rIndicators] = await Axios.all([
                this.getUsers(),
                this.getIndicators(),
            ]);

            this.setState(
                {
                    users: rUsers.data,
                    indicators: rIndicators.data,
                    initialized: true
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

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
                    if (this.state.initialized) this.toggleModal(rowData, 'add');
                },
                isFreeAction: true
            }
        ];

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'indicatorName', title: 'Индикатор'},
            {field: 'rusRole', title: 'Роль'},
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
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма создания согласования</MDBModalHeader>
                        <MDBModalBody>
                            <ExecutorsByIndicatorEdit
                                indicators={this.state.indicators}
                                users={this.state.users}
                                tableRef={this.tableRef}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
};
