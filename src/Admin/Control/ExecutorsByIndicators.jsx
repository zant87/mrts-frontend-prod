import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import appAxios from "../../_services/appAxios";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import moment from "moment";
import Axios from "axios";
import ExecutorsByIndicatorEdit from "./ExecutorsByIndicators/ExecutorsByIndicatorEdit";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import DateFilter from "../../Common/Filters/DateFilter";

export default class AdminExecutorsByIndicatorPage extends React.Component {

    state = {
        modal: false,
        row: {},
        initialized: false,
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            indicatorName: {
                type: "text",
                operator: "contains",
                value: null
            },
            rusRole: {
                type: "text",
                operator: "contains",
                value: null
            },
            fullname: {
                type: "text",
                operator: "contains",
                value: null
            },
            beginDate: {
                type: "date",
                operator: "equals",
                value: null
            },
            endDate: {
                type: "date",
                operator: "equals",
                value: null
            },
        }
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

            const usersList = rUsers.data.map(item => {
                    return {value: item.id, text: item.fullname, checked: false};
                }
            );

            const indicatorsList = rIndicators.data.map(item => {
                    return {value: item.id, text: item.name, checked: false};
                }
            );

            this.setState(
                {
                    users: rUsers.data,
                    usersList: usersList,
                    indicatorsList: indicatorsList,
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

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
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
            {
                field: 'id', title: '#', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'indicatorName', title: 'Индикатор', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'rusRole', title: 'Роль', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'fullname', title: 'Пользователь', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'beginDate', title: 'Начало действия', type: 'date', filtering: true,
                filterComponent: props => {
                    return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                       filter={this.state.filtersList[props.columnDef.field]}
                                       filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'endDate', title: 'Конец действия', type: 'date', filtering: true,
                filterComponent: props => {
                    return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                       filter={this.state.filtersList[props.columnDef.field]}
                                       filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        return (
            <React.Fragment>

                <TableContainerWithFilters
                    columns={columns}
                    title={"Исполнители по индикаторам"}
                    baseUrl={"views/indicator-agree-settings"}
                    tableRef={this.tableRef}
                    actions={actions}
                    filtersList={this.state.filtersList}
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
