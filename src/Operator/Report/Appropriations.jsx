import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";

export default class OperatorReportAppropriationsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    };

    render() {

        const columns = [
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'directionName', title: 'Направление расходов', editable: 'never'},
            {field: 'fundingName', title: 'Источник финансирования', editable: 'never'},
            {field: 'costTypeName', title: 'Вид расходов', editable: 'never'},
            {field: 'plan', title: 'Запланировано, млн. руб.'},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.'},
        ];

        const {data, page, count, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Бюджетные ассигнования в рамках программ развития транспорта"
                            columns={columns}
                            tableRef={tableRef}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    appAxios.get(`/views/k-9-s?page=${query.page}&size=${query.pageSize}&sort=id,desc`)
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

                                            console.log(newData);

                                            appAxios({
                                                url: `/views/k-9-s/update?pID=${newData.id}&pDoc=${newData.documentId}&pPlan=${newData.plan}&pFact=${newData.fact}`,
                                                method: 'GET'
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
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
                                pageSizeOptions: [20, 50, 100],
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
