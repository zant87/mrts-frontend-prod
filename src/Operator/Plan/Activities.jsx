import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect} from "mdbreact";

export default class OperatorPlanActivitiesPage extends React.Component {

    state = {
        modal: false,
        action: '',
        transportStrategies: [],
        transportStrategiesList: [],
        initialized: false
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

    render() {

        const columns = [
            {field: 'activityId', title: '#', filtering: false},
            {field: 'transportStrategyVersionId', title: 'Редакция ТС', lookup: this.state.transportStrategiesList},
            // {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'activityCode', title: 'Обозначение мероприятия'},
            {field: 'activityDescription', title: 'Содержание мероприятия'},
            {field: 'documentType', title: 'Вид документа'},
            {field: 'yearBegin', title: 'Начало реализации', filtering: false},
            {field: 'yearEnd', title: 'Конец реализации', filtering: false},
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
                    tableRef={this.tableRef}
                    title={'Мероприятия по реализации ТС'}
                    baseUrl={'views/k-2-s'}
                    loadAll={true}
                    editable={editable}
                />
            </React.Fragment>
        )
    }
};
