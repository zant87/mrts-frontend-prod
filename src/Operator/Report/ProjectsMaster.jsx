import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import {history} from "@/_helpers";

export default class OperatorReportProjectsMasterPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        rowsPerPage: 20,
        isLoading: false,
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-7-masters-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год', editable: 'never'},
            {field: 'projectCode', title: 'Обозначение проекта', editable: 'never'},
            {field: 'projectName', title: 'Содержание проекта', editable: 'never'},
            {field: 'done', title: 'Уровень технической готовности', editable: 'never'},
            {field: 'planBeginYear', title: 'Сроки реализации плановые', editable: 'never'},
            {field: 'factStarted', title: 'Начало фактической реализации', editable: 'never'},
            {field: 'factFinished', title: 'Конец фактической реализации', editable: 'never'},
            {field: 'realPlanCost', title: 'Общие затраты (плановые)', filtering: false},
            {field: 'fact', title: 'Общие затраты (факт)', filtering: false},
            {field: 'description', title: 'Фактические результаты'},
        ];

        const tableRef = React.createRef();
        const {data, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-3 mx-auto'>
                        <MaterialTable
                            title="Выполнение крупных инвестиционных проектов (master)"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            localization={ruLocalization}
                            // editable={{
                            //     onRowUpdate: (newData, oldData) =>
                            //         new Promise((resolve, reject) => {
                            //             setTimeout(() => {
                            //                 const dataUpdate = [...data];
                            //                 const index = dataUpdate.findIndex(item => item.id === oldData.id);
                            //
                            //                 newData.value = (newData.value !== null) ? newData.value : 0;
                            //                 dataUpdate[index] = newData;
                            //
                            //                 console.log(newData);
                            //
                            //                 appAxios.get(`/views/k-7-masters/update?pID=${newData.id}&pDoc=${newData.documentId}&pIdProject=${newData.projectId}&pFactStarted=${newData.factStarted}&pFactFinished=${newData.factFinished}&pDone=${newData.done}&pRptDescription=${newData.description}`)
                            //                     .then(res => {
                            //                         const data = res.data;
                            //                         this.setState({result: data, isLoading: false});
                            //                         toast.success(`Обновили данные документа №${data}`, {
                            //                             closeButton: false
                            //                         });
                            //                     }).catch(function (error) {
                            //                     console.log(error);
                            //                     toast.error(`Ошибка при обновлении документа`, {
                            //                         closeButton: false
                            //                     });
                            //                 });
                            //
                            //                 this.setState({data: dataUpdate});
                            //
                            //                 resolve();
                            //             }, 6000)
                            //         }),
                            // }}
                            options={{
                                actionsColumnIndex: 999,
                                search: false,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                filtering: true
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Редактировать',
                                    onClick: (event, rowData) => {
                                        console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${rowData.id}`);
                                        history.push(`${history.location.pathname}/${rowData.id}`, rowData);
                                    }
                                }
                            ]}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
