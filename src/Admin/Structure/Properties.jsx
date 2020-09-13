import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast,} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from 'axios';
import TableContainer from "../../Containers/TableContainer";
import PropertyEdit from "./PropertyEdit";

export default class AdminStructurePropertiesPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        dataTypes: {},
        okeis: {},
        initialized: false
    }


    tableRef = React.createRef();

    getDataTypes = () => appAxios.get(`data-types`).catch(err => null);
    getOkeis = () => appAxios.get(`nsi-okeis`).catch(err => null);

    async componentDidMount() {
        try {
            const [rDataTypes, rOkeis] = await Axios.all([this.getDataTypes(), this.getOkeis()]);

            this.setState(
                {
                    dataTypes: rDataTypes.data,
                    okeis: rOkeis.data,
                    initialized: true
                }
            );

        } catch (err) {
            console.log(err.message);
        }
    }

    toggleModal = (rowData, action) => {
        console.log(rowData);
        if (rowData && action) {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
        } else {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'code', title: 'Код'},
            {field: 'name', title: 'Наименование'},
            {field: 'dataTypeName', title: 'Тип данных'},
            {field: 'okeiName', title: 'Единица измерения'},
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },
            {
                icon: 'delete',
                tooltip: 'Удалить',
                onClick: (event, rowData) => {
                    appAxios({
                        url: `user-properties/${rowData.id}`,
                        method: 'DELETE',
                    }).then((response) => {
                        const message = response.headers["x-mrts-backend-params"];
                        toast.success(`Удалена запись с ID ${message}`, {
                            closeButton: false
                        });
                        this.tableRef.current.onQueryChange();
                    });
                }
            },
            {
                icon: 'add',
                tooltip: 'Добавить',
                isFreeAction: true,
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'add');
                }
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Показатели шаблонов проектов'}
                    baseUrl={'user-properties-page'}
                    loadAll={true}
                    tableRef={this.tableRef}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <PropertyEdit
                                data={this.state.row}
                                action={this.state.action}
                                dataTypes={this.state.dataTypes}
                                okeis={this.state.okeis}
                                tableRef={this.tableRef}
                                toggleModal={this.toggleModal}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>

            // <MDBContainer fluid>
            //     <MDBRow center>
            //         <MDBCol md={'12'} className='my-2 mx-auto'>
            //             <MaterialTable
            //                 title="Показатели шаблонов проектов"
            //                 columns={columns}
            //                 tableRef={tableRef}
            //                 data={data}
            //                 isLoading={isLoading}
            //                 localization={ruLocalization}
            //                 options={{
            //                     search: false,
            //                     pageSize: 20,
            //                     pageSizeOptions: [20, 50, 100],
            //                     actionsColumnIndex: 999,
            //                 }}
            //                 editable={{
            //                     onRowAdd: newData =>
            //                         new Promise((resolve, reject) => {
            //                             setTimeout(() => {
            //                                 const dataNew = [...data];
            //
            //                                 const responseData = {
            //                                     code: newData.code,
            //                                     name: newData.name,
            //                                     dataTypeId: newData.dataTypeId,
            //                                     okeiId: newData.okeiId,
            //                                 };
            //
            //                                 appAxios({
            //                                     url: `user-properties`,
            //                                     method: 'POST',
            //                                     data: responseData
            //                                 }).then((response) => {
            //                                     const message = response.headers["x-mrts-backend-params"];
            //                                     toast.success(`Успешно добавлена запись с ID ${message}`, {
            //                                         closeButton: false
            //                                     });
            //                                     newData.id = message;
            //                                     dataNew.push(newData);
            //                                     this.setState({data: dataNew});
            //                                 });
            //
            //                                 resolve();
            //                             }, 1000)
            //                         }),
            //                     onRowUpdate: (newData, oldData) =>
            //                         new Promise((resolve, reject) => {
            //                             setTimeout(() => {
            //                                 const dataUpdate = [...data];
            //                                 const index = dataUpdate.findIndex(item => item.id === oldData.id);
            //                                 dataUpdate[index] = newData;
            //
            //                                 const responseData = {
            //                                     id: newData.id,
            //                                     code: newData.code,
            //                                     name: newData.name,
            //                                     dataTypeId: newData.dataTypeId,
            //                                     okeiId: newData.okeiId,
            //                                 };
            //
            //                                 appAxios({
            //                                     url: `user-properties`,
            //                                     method: 'PUT',
            //                                     data: responseData
            //                                 }).then((response) => {
            //                                     const message = response.headers["x-mrts-backend-params"];
            //                                     toast.success(`Успешно обновлена запись с ID ${message}`, {
            //                                         closeButton: false
            //                                     });
            //                                 });
            //
            //                                 this.setState({data: dataUpdate});
            //                                 resolve();
            //                             }, 1000)
            //                         }),
            //                     onRowDelete: oldData =>
            //                         new Promise((resolve, reject) => {
            //                             setTimeout(() => {
            //
            //                                 const dataDelete = [...data];
            //                                 const index = dataDelete.findIndex(item => item.id === oldData.id);
            //
            //                                 appAxios({
            //                                     url: `user-properties/${oldData.id}`,
            //                                     method: 'DELETE',
            //                                 }).then((response) => {
            //                                     const message = response.headers["x-mrts-backend-params"];
            //                                     toast.success(`Удалена запись с ID ${message}`, {
            //                                         closeButton: false
            //                                     });
            //                                 });
            //
            //                                 dataDelete.splice(index, 1);
            //
            //                                 this.setState({data: dataDelete});
            //                                 resolve();
            //                             }, 1000)
            //                         }),
            //                 }}
            //             />
            //         </MDBCol>
            //     </MDBRow>
            // </MDBContainer>
        )
    }
}
