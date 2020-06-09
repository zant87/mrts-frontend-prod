import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorReportAppropriationsPage extends React.Component {

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
        appAxios.get(`/views/k-9-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
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

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Бюджетные ассигнования в рамках программ развития транспорта"
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

                                            newData.plan = (newData.plan !== null) ? newData.plan : 0;
                                            newData.fact = (newData.fact !== null) ? newData.fact : 0;

                                            dataUpdate[index] = newData;
                                            this.setState({data: dataUpdate});

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
                                search: true,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                filtering: true
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}