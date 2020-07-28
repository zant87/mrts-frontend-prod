import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import {history} from "@/_helpers";
import TableContainer from "../../_components/TableContainer";
import FinancingEdit from "./Financing/FinancingEdit";
import ProjectsMasterEdit from "./ProjectsMaster/ProjectsMasterEdit";

export default class OperatorReportProjectsMasterPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true
    }

    toggleModal = (rowData, action) => {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    tableRef = React.createRef();

    render() {

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    console.log(rowData);
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },
        ];

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'projectCode', title: 'Обозначение проекта'},
            {field: 'projectName', title: 'Содержание проекта'},
            {field: 'done', title: 'Уровень технической готовности', filtering: false},
            {field: 'planBeginYear', title: 'Сроки реализации плановые', filtering: false},
            {field: 'factStarted', title: 'Начало фактической реализации', filtering: false},
            {field: 'factFinished', title: 'Конец фактической реализации', filtering: false},
            {field: 'realPlanCost', title: 'Общие затраты (плановые)', filtering: false},
            {field: 'fact', title: 'Общие затраты (факт)', filtering: false},
            {field: 'description', title: 'Фактические результаты'},
        ];

        const filtersList = {
            'yearNumber': 'equals'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Выполнение крупных инвестиционных проектов (master)'}
                    filtersList={filtersList}
                    baseUrl={'views/k-7-masters'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="fluid">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ProjectsMasterEdit
                                data={this.state.row}
                                action={this.state.action}
                                tableRef={this.tableRef}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
            // <MDBContainer fluid>
            //     <MDBRow center>
            //         <MDBCol md={'12'} className='my-3 mx-auto'>
            //             <MaterialTable
            //                 title="Выполнение крупных инвестиционных проектов (master)"
            //                 columns={columns}
            //                 tableRef={tableRef}
            //                 data={data}
            //                 isLoading={isLoading}
            //                 localization={ruLocalization}
            //                 // editable={{
            //                 //     onRowUpdate: (newData, oldData) =>
            //                 //         new Promise((resolve, reject) => {
            //                 //             setTimeout(() => {
            //                 //                 const dataUpdate = [...data];
            //                 //                 const index = dataUpdate.findIndex(item => item.id === oldData.id);
            //                 //
            //                 //                 newData.value = (newData.value !== null) ? newData.value : 0;
            //                 //                 dataUpdate[index] = newData;
            //                 //
            //                 //                 console.log(newData);
            //                 //
            //                 //                 appAxios.get(`/views/k-7-masters/update?pID=${newData.id}&pDoc=${newData.documentId}&pIdProject=${newData.projectId}&pFactStarted=${newData.factStarted}&pFactFinished=${newData.factFinished}&pDone=${newData.done}&pRptDescription=${newData.description}`)
            //                 //                     .then(res => {
            //                 //                         const data = res.data;
            //                 //                         this.setState({result: data, isLoading: false});
            //                 //                         toast.success(`Обновили данные документа №${data}`, {
            //                 //                             closeButton: false
            //                 //                         });
            //                 //                     }).catch(function (error) {
            //                 //                     console.log(error);
            //                 //                     toast.error(`Ошибка при обновлении документа`, {
            //                 //                         closeButton: false
            //                 //                     });
            //                 //                 });
            //                 //
            //                 //                 this.setState({data: dataUpdate});
            //                 //
            //                 //                 resolve();
            //                 //             }, 6000)
            //                 //         }),
            //                 // }}
            //                 options={{
            //                     actionsColumnIndex: 999,
            //                     search: false,
            //                     pageSize: 20,
            //                     pageSizeOptions: [20, 50, 100],
            //                     filtering: true
            //                 }}
            //                 actions={[
            //                     {
            //                         icon: 'edit',
            //                         tooltip: 'Редактировать',
            //                         onClick: (event, rowData) => {
            //                             console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${rowData.id}`);
            //                             history.push(`${history.location.pathname}/${rowData.id}`, rowData);
            //                         }
            //                     }
            //                 ]}
            //             />
            //         </MDBCol>
            //     </MDBRow>
            // </MDBContainer>
        );
    }
}
