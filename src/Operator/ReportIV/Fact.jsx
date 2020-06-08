import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorReportFactPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-5-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'dataProviderName', title: 'Источник данных', editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', editable: 'never'},
            {field: 'formCode', title: 'Форма', editable: 'never'},
            {field: 'parameterName', title: 'Показатель', editable: 'never'},
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', editable: 'never'},
            {field: 'okeiName', title: 'Единица измерения', editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: false},
        ];

        const tableRef = React.createRef();
        const {data, isLoading} = this.state;

        return (

            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Фактические значения показателей"
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

                                            newData.value = (newData.value !== null) ? newData.value : 0;
                                            dataUpdate[index] = newData;

                                            this.setState({data: dataUpdate});
                                            const requestData = {id: newData.id, value: newData.value};

                                            appAxios({
                                                url: `views/k-5-s`,
                                                method: 'PUT',
                                                data: requestData
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно обновлена запись с ID ${message}`, {
                                                    closeButton: false
                                                });
                                            });

                                            resolve();
                                        }, 6000)
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
}
