import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorPlanIndicatorsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
        okeiList: []
    };

    componentDidMount() {
        this.getData();
        this.getOkeiList();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-1-s-all`)
            .then(res => {
                console.log(res.headers);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    getOkeiList = async () => {
        appAxios.get(`/nsi-okeis`)
            .then(res => {
                const data = res.data.map(item => {
                    return {id: item.id, name: item.name};
                })
                const mod_data = data.reduce(function (acc, cur, i) {
                    acc[cur.id] = cur.name;
                    return acc;
                }, {});
                console.log(data);
                console.log(mod_data);
                this.setState({okeiList: mod_data});
            });
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'transportStrategyCode', title: 'Редакция ТС', editable: 'never'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии', editable: 'never'},
            {field: 'goalName', title: 'Цель', editable: 'never'},
            {field: 'indicatorName', title: 'Индикатор', editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', editable: 'never'},
            {field: 'indicatorDate', title: 'Этап реализации стратегии', editable: 'never'},
            {field: 'okeiId', title: 'Единица измерения', lookup: this.state.okeiList},
            {field: 'value', title: 'Значение индикатора', filtering: false},
        ];

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        <MaterialTable
                            title="Индикаторы ТС по целям и задачам (план)"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            localization={ruLocalization}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                            dataUpdate[index] = newData;
                                            this.setState({data: dataUpdate});

                                            const responseData = {
                                                id: newData.id, okeiId: newData.okeiId,
                                                indicatorValueId: newData.indicatorValueId, value: newData.value
                                            };

                                            console.log(responseData);
                                            appAxios({
                                                url: `views/k-1-s`,
                                                method: 'PUT',
                                                data: responseData
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно обновлена запись с ID ${message}`, {
                                                    closeButton: false
                                                });
                                            });

                                            resolve();
                                        }, 1000)
                                    }),
                            }}
                            options={{
                                actionsColumnIndex: 999,
                                search: true,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                filtering: true
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};
