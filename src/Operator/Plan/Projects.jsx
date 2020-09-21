import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import OpeatorPlanActivitiesEditPage from "./Activities/ActivitiesEdit";
import OpeatorPlanProjectsEditPage from "./Projects/ProjectsEdit";

export default class OperatorPlanProjectsPage extends React.Component {

    state = {
        modal: false,
        action: '',
        transportStrategies: [],
        scenarios: [],
        initialized: false,
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            transportStrategyName: {
                type: "text",
                operator: "contains",
                value: null
            },
            projectCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            projectName: {
                type: "text",
                operator: "contains",
                value: null
            },
            scenarioName: {
                type: "text",
                operator: "contains",
                value: null
            },
            workStage: {
                type: "text",
                operator: "contains",
                value: null
            },
            geolink: {
                type: "text",
                operator: "contains",
                value: null
            },
            cost: {
                type: "numeric",
                operator: "equals",
                value: null
            }
        },
    }
    tableRef = React.createRef();

    getTransportStrategy = () => appAxios.get(`transport-strategy-versions`).catch(err => null);
    getScenarios = () => appAxios.get(`scenarios`).catch(err => null);

    async componentDidMount() {
        try {
            const [rTransportStrategies, rScenarios] = await Axios.all([this.getTransportStrategy(), this.getScenarios()]);

            this.setState(
                {
                    transportStrategies: rTransportStrategies.data,
                    scenarios: rScenarios.data,
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
                field: 'id', title: '#', filtering: true,
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
                field: 'projectCode', title: 'Обозначение проекта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'projectName', title: 'Проект', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'scenarioName', title: 'Вариант реализации стратегии', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'workStage', title: 'Стадия работ', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'geolink', title: 'Географическая привязка', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'cost', title: 'Общие затраты млрд. руб', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            }

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

        // const editable = {
        //     onRowAdd: newData =>
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //
        //                 const data = {...newData, code: newData.projectCode, name: newData.projectName};
        //                 console.log('Data =', data);
        //
        //                 appAxios({
        //                     url: `projects`,
        //                     method: 'POST',
        //                     data: data
        {/*                }).then((response) => {*/
        }
        {/*                    const message = response.headers["x-mrts-backend-params"];*/
        }
        //                     toast.success(`Успешно добавлена запись с ID ${message}`, {
        //                         closeButton: false
        //                     });
        //                 });
        //
        //                 this.tableRef.current.onQueryChange();
        //
        //                 resolve();
        {/*            }, 1000)*/
        }
        //         }),
        //     onRowUpdate: (newData, oldData) =>
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //
        //                 const data = {...newData, code: newData.projectCode, name: newData.projectName};
        //                 console.log('Data =', data);
        //
        {/*                appAxios({*/
        }
        {/*                    url: `projects`,*/
        }
        {/*                    method: 'PUT',*/
        }
        {/*                    data: data*/
        }
        {/*                }).then((response) => {*/
        }
        {/*                    const message = response.headers["x-mrts-backend-params"];*/
        }
        {/*                    toast.success(`Успешно добавлена запись с ID ${message}`, {*/
        }
        {/*                        closeButton: false*/
        }
        {/*                    });*/
        }
        {/*                });*/
        }
        //
        //                 this.tableRef.current.onQueryChange();
        //
        //                 resolve();
        //             }, 1000)
        //         }),
        //
        // };

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    tableRef={this.tableRef}
                    title={'Крупные инвестиционные проекты'}
                    baseUrl={'views/k-3-s'}
                    loadAll={true}
                    filtersList={this.state.filtersList}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true} size={'lg'}>
                        <MDBModalHeader toggle={this.toggleModal}>Редактирование</MDBModalHeader>
                        <MDBModalBody>
                            <OpeatorPlanProjectsEditPage
                                action={this.state.action}
                                data={this.state.row}
                                tableRef={this.tableRef}
                                transportStrategiesList={this.state.transportStrategies}
                                scenariosList={this.state.scenarios}
                                toggleModal={this.toggleModal}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
};
