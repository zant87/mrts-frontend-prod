import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorReportActivitiesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-6-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const columns = [
            {field: 'activityReportId', title: '#', editable: 'never', filtering: false},
            {field: 'activityCode', title: 'Код мероприятия', editable: 'never'},
            {field: 'executor', title: 'Исполнитель', editable: 'never'},
            {field: 'documentType', title: 'Вид документа', editable: 'never'},
            {field: 'activityDescription', title: 'Содержание мероприятия', editable: 'never'},
            {field: 'yearNumber', title: 'Отчетный год', editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', editable: 'never'},
            {field: 'reportDescription', title: 'Отчет исполнителя'},
        ];

        const tableRef = React.createRef();
        const {data, page, count, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-3 mx-auto'>
                        <MaterialTable
                            title="Выполнение мероприятий по реализации ТС"
                            columns={columns}
                            tableRef={tableRef}
                            isLoading={isLoading}
                            localization={ruLocalization}
                            data={data}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                            dataUpdate[index] = newData;
                                            this.setState({data: dataUpdate});

                                            appAxios({
                                                url: `/views/k-6-s/update?pID=${newData.activityReportId}&pDoc=${newData.documentId}&pRptDescription=${newData.reportDescription}`,
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
