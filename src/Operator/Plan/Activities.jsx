import React from 'react';
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {
    toast,
    MDBContainer,
    MDBModal,
    MDBModalHeader, MDBModalBody
} from "mdbreact";
import NumericFilter from "../../Common/Filters/NumericFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import StringFilter from "../../Common/Filters/StringFilter";
import OpeatorPlanActivitiesEditPage from "./Activities/ActivitiesEdit";

export default class OperatorPlanActivitiesPage extends React.Component {

    state = {
        modal: false,
        action: '',
        transportStrategies: [],
        transportStrategiesList: [],
        initialized: false,
        filtersList: {
            activityId: {
                type: "integer",
                operator: "equals",
                value: null
            },
            transportStrategyName: {
                type: "text",
                operator: "contains",
                value: null
            },
            activityCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            activityDescription: {
                type: "text",
                operator: "contains",
                value: null
            },
            documentType: {
                type: "text",
                operator: "contains",
                value: null
            },
            yearBegin: {
                type: "integer",
                operator: "equals",
                value: null
            },
            yearEnd: {
                type: "integer",
                operator: "equals",
                value: null
            },
        },
    }

    tableRef = React.createRef();

    getTransportStrategy = () => appAxios.get(`transport-strategy-versions`).catch(err => null);

    async componentDidMount() {
        try {
            const [rTransportStrategies] = await Axios.all([this.getTransportStrategy()]);

            const rTransportStrategiesList = rTransportStrategies.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rTransportStrategiesListMod = rTransportStrategiesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    transportStrategies: rTransportStrategies.data,
                    transportStrategiesList: rTransportStrategiesListMod,
                    initialized: true
                }
            );

        } catch (err) {
            console.error(err.message);
        }
    }

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
    }

    toggleModal = (rowData, action) => {
        this.setState({
            row: rowData,
            modal: !this.state.modal,
            action: action
        });
    }

    render() {

        const columns = [
            {
                field: 'activityId', title: '#', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'transportStrategyName', title: 'Редакция ТС', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'activityCode', title: 'Обозначение мероприятия', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'activityDescription', title: 'Содержание мероприятия', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'documentType', title: 'Вид документа', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'yearBegin', title: 'Начало реализации', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'yearEnd', title: 'Конец реализации', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    console.log('Editing row =', rowData);
                    this.toggleModal(rowData, 'edit');
                }
            },
            {
                icon: 'add',
                tooltip: 'Добавить',
                onClick: (event, rowData) => {
                    console.log('Adding row =', rowData);
                    this.toggleModal(rowData, 'add');
                },
                isFreeAction: true
            },
        ];

        const editable = {
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const data = {
                            code: newData.activityCode,
                            name: newData.activityCode,
                            documentType: newData.documentType,
                            beginYear: newData.yearBegin,
                            endYear: newData.yearEnd,
                            description: newData.activityDescription,
                            transportStrategyVersionId: newData.transportStrategyVersionId,
                        };

                        console.log(data);

                        appAxios({
                            url: `activities`,
                            method: 'POST',
                            data: data
                        }).then((response) => {
                            const message = response.headers["x-mrts-backend-params"];
                            toast.success(`Успешно добавлена запись с ID ${message}`, {
                                closeButton: false
                            });
                        });

                        this.tableRef.current.onQueryChange();

                        resolve();
                    }, 1000)
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const data = {
                            id: newData.activityId,
                            code: newData.activityCode,
                            name: newData.activityCode,
                            documentType: newData.documentType,
                            beginYear: newData.yearBegin,
                            endYear: newData.yearEnd,
                            description: newData.activityDescription,
                            transportStrategyVersionId: newData.transportStrategyVersionId,
                        }

                        console.log(data);

                        appAxios({
                            url: `activities`,
                            method: 'PUT',
                            data: data
                        }).then((response) => {
                            const message = response.headers["x-mrts-backend-params"];
                            toast.success(`Успешно добавлена запись с ID ${message}`, {
                                closeButton: false
                            });
                            this.tableRef.current.onQueryChange();

                        });

                        resolve();
                    }, 1000)
                }),

        };

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    tableRef={this.tableRef}
                    title={'Мероприятия по реализации ТС'}
                    baseUrl={'views/k-2-s'}
                    loadAll={true}
                    filtersList={this.state.filtersList}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true} size={'lg'}>
                        <MDBModalHeader toggle={this.toggleModal}>Редактирование</MDBModalHeader>
                        <MDBModalBody>
                            <OpeatorPlanActivitiesEditPage
                                action={this.state.action}
                                data={this.state.row}
                                tableRef={this.tableRef}
                                transportStrategiesList={this.state.transportStrategies}
                                toggleModal={this.toggleModal}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
};
