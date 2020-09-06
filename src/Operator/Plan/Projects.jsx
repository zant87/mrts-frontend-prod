import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {toast} from "mdbreact";

export default class OperatorPlanProjectsPage extends React.Component {

    state = {
        modal: false,
        action: '',
        transportStrategies: [],
        transportStrategiesList: [],
        initialized: false
    }
    tableRef = React.createRef();

    getTransportStrategy = () => appAxios.get(`transport-strategy-versions`).catch(err => null);

    getScenarios = () => appAxios.get(`scenarios`).catch(err => null);

    async componentDidMount() {
        try {
            const [rTransportStrategies, rScenarios] = await Axios.all([this.getTransportStrategy(), this.getScenarios()]);

            const rTransportStrategiesList = rTransportStrategies.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rTransportStrategiesListMod = rTransportStrategiesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            const rScenariosList = rScenarios.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rScenariosListMod = rScenariosList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    transportStrategies: rTransportStrategies.data,
                    transportStrategiesList: rTransportStrategiesListMod,
                    scenarios: rScenarios.data,
                    scenariosList: rScenariosListMod,
                    initialized: true
                }
            );

        } catch (err) {
            console.error(err.message);
        }
    }

    render() {
        const columns = [
            {field: 'id', title: '#', filtering: false},
            // {field: 'transportStrategyName', title: 'Редакция ТС'}, transportStrategyVersionId
            {field: 'transportStrategyVersionId', title: 'Редакция ТС', lookup: this.state.transportStrategiesList},
            {field: 'projectCode', title: 'Обозначение проекта'},
            {field: 'projectName', title: 'Проект'},
            // {field: 'scenarioName', title: 'Вариант реализации стратегии'}, scenarioId
            {field: 'scenarioId', title: 'Вариант реализации стратегии', lookup: this.state.scenariosList},
            {field: 'cost', title: 'Общие затраты млрд. руб', filtering: false},
            {field: 'workStage', title: 'Стадия работ', filtering: false},
            {field: 'geolink', title: 'Географическая привязка'},
        ];

        const editable = {
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const data = {...newData, code: newData.projectCode, name: newData.projectName};
                        console.log('Data =', data);

                        appAxios({
                            url: `projects`,
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

                        const data = {...newData, code: newData.projectCode, name: newData.projectName};
                        console.log('Data =', data);

                        appAxios({
                            url: `projects`,
                            method: 'PUT',
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

        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Крупные инвестиционные проекты'}
                    baseUrl={'views/k-3-s'}
                    loadAll={true}
                    tableRef={this.tableRef}
                    editable={editable}
                />
            </React.Fragment>
        )
    }
};
