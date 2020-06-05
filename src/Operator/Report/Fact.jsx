import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";

export default class OperatorReportFactPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false
    }

    render() {

        const columns = [
            {field: 'id', title: '#'},
            {field: 'dataProviderName', title: 'Источник данных', editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', editable: 'never'},
            {field: 'formCode', title: 'Форма', editable: 'never'},
            {field: 'parameterName', title: 'Показатель', editable: 'never'},
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', editable: 'never'},
            {field: 'okeiName', title: 'Единица измерения', editable: 'never'},
            {field: 'value', title: 'Значение показателя'},
        ];

        const tableRef = React.createRef();
        const {data, page, count, isLoading} = this.state;

        return (

            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Фактические значения показателей"
                            columns={columns}
                            tableRef={tableRef}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    appAxios.get(`/views/k-5-s?page=${query.page}&size=${query.pageSize}&sort=id,desc`)
                                        .then(res => {
                                            const count = Number(res.headers['x-total-count']);
                                            const data = res.data;

                                            resolve({
                                                data: data,
                                                page: query.page,
                                                totalCount: count
                                            });
                                        });
                                })}

                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;

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
                                        }, 1000)
                                    }),
                            }}
                            options={{
                                actionsColumnIndex: 999,
                                search: false,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100]
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};
