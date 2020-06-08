import React, {Fragment} from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorPlanResourcesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-4-s-all`)
            .then(res => {
                console.log(res.headers);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'transportStrategyCode', title: 'Редакция ТС', editable: 'never'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии', editable: 'never'},
            {field: 'costTypeName', title: 'Вид вложений', editable: 'never'},
            {field: 'directionName', title: 'Направление вложений', editable: 'never'},
            {field: 'fundingSourceName', title: 'Источник финансирования', editable: 'never'},
            {field: 'stageName', title: 'Период реализации стратегии', editable: 'never'},
            {field: 'planingMin', title: 'Минимальное ресурсное обеспечение, млрд. руб.', filtering: false},
            {field: 'planingMax', title: 'Максимальное ресурсное обеспечение, млрд. руб.', filtering: false},
        ];

        const tableRef = React.createRef();
        const {data, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        <MaterialTable
                            title="Ресурсное обеспечение ТС (план)"
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
                                                id: newData.id,
                                                planingMax: newData.planingMax,
                                                planingMin: newData.planingMin
                                            };

                                            appAxios({
                                                url: `views/k-4-s`,
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
