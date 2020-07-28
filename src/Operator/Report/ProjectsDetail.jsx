import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, toast} from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import TableContainer from "../../_components/TableContainer";

export default class OperatorReportProjectsDetailPage extends React.Component {

    render() {

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'projectCode', title: 'Обозначение проекта', editable: false},
            {field: 'projectName', title: 'Содержание проекта', editable: false},
            {field: 'costTypename', title: 'Вид расходов', editable: false},
            {field: 'fundSourceName', title: 'Источник финансирования', editable: false},
            {field: 'plan', title: 'Предусмотрено на год', filtering: false},
            {field: 'spent', title: 'Освоено на год', filtering: false},
            {field: 'fact', title: 'Кассовые расходы за год', filtering: false},
        ];

        const filtersList = {
            'yearNumber': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Финансирование проектов ТС (detail)'}
                    baseUrl={'views/k-7-details'}
                    filtersList={filtersList}
                    loadAll={true}
                />
            </React.Fragment>
            // <MDBContainer fluid>
            //     <MDBRow center>
            //         <MDBCol md={'12'} className='my-3 mx-auto'>
            //             <MaterialTable
            //                 title="Финансирование проектов ТС (detail)"
            //                 columns={columns}
            //                 tableRef={tableRef}
            //                 data={data}
            //                 isLoading={isLoading}
            //                 localization={ruLocalization}
            //                 editable={{
            //                     onRowUpdate: (newData, oldData) =>
            //                         new Promise((resolve, reject) => {
            //                             setTimeout(() => {
            //                                 const dataUpdate = [...data];
            //                                 const index = dataUpdate.findIndex(item => item.id === oldData.id);
            //
            //                                 newData.value = (newData.value !== null) ? newData.value : 0;
            //                                 dataUpdate[index] = newData;
            //
            //                                 console.log(newData);
            //
            //                                 appAxios.get(`/views/k-7-details/update?pID=${newData.id}&pDoc=${newData.documentId}&pPlan=${newData.plan}&pSpent=${newData.spent}&pFact=${newData.fact}`)
            //                                     .then(res => {
            //                                         const data = res.data;
            //                                         this.setState({result: data, isLoading: false});
            //                                         toast.success(`Обновили данные документа №${data}`, {
            //                                             closeButton: false
            //                                         });
            //                                     }).catch(function (error) {
            //                                     console.log(error);
            //                                     toast.error(`Ошибка при обновлении документа`, {
            //                                         closeButton: false
            //                                     });
            //                                 });
            //
            //                                 this.setState({data: dataUpdate});
            //
            //                                 resolve();
            //                             }, 6000)
            //                         }),
            //                 }}
            //                 options={{
            //                     actionsColumnIndex: 999,
            //                     search: true,
            //                     pageSize: 20,
            //                     pageSizeOptions: [20, 50, 100],
            //                     filtering: true
            //                 }}
            //             />
            //         </MDBCol>
            //     </MDBRow>
            // </MDBContainer>
        );
    }
}
