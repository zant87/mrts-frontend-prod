import React from 'react';
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import AdminControlExecutorsEditPage from "./Executors/ExecutorsEdit";

export default class AdminControlExecutorsPage extends React.Component {

    state = {
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            email: {
                type: "text",
                operator: "contains",
                value: null
            },
            phone: {
                type: "text",
                operator: "contains",
                value: null
            },
            fullname: {
                type: "text",
                operator: "contains",
                value: null
            },
            department: {
                type: "text",
                operator: "contains",
                value: null
            },
            username: {
                type: "text",
                operator: "contains",
                value: null
            },
        },
        modal: false,
        row: {}
    };

    tableRef = React.createRef();

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
    }

    toggleModal = (rowData) => {
        this.setState({
            row: rowData,
            modal: !this.state.modal,
        });
    }

    render() {

        const columns = [
            {
                field: 'id', title: '#', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'email', title: 'Электронная почта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'fullname', title: 'ФИО', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'phone', title: 'Телефон', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'department', title: 'Департамент', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'username', title: 'ID пользователя', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    console.log('Editing row =', rowData);
                    this.toggleModal(rowData);
                }
            },
        ];


        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={"Реестр исполнителей"}
                    baseUrl={"users-page"}
                    tableRef={this.tableRef}
                    actions={actions}
                    filtersList={this.state.filtersList}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true}>
                        <MDBModalHeader toggle={this.toggleModal}>Редактирование</MDBModalHeader>
                        <MDBModalBody>
                            <AdminControlExecutorsEditPage
                                data={this.state.row}
                                tableRef={this.tableRef}
                                toggleModal={this.toggleModal}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
            // <React.Fragment>
            //     <MaterialTable
            //         title="Реестр исполнителей"
            //         columns={columns}
            //         localization={ruLocalization}
            //         data={data}
            //         editable={{
            //             onRowAdd: newData =>
            //                 new Promise((resolve, reject) => {
            //                     setTimeout(() => {
            //                         const dataNew = [...data];
            //                         appAxios({
            //                             url: `users`,
            //                             method: 'POST',
            //                             data: newData
            //                         }).then((response) => {
            //                             const message = response.headers["x-mrts-backend-params"];
            //                             toast.success(`Успешно добавлена запись с ID ${message}`, {
            //                                 closeButton: false
            //                             });
            //                             newData.id = message;
            //                             dataNew.push(newData);
            //                             this.setState({data: dataNew});
            //                         });
            //
            //                         resolve();
            //                     }, 1000)
            //                 }),
            //             onRowUpdate: (newData, oldData) =>
            //                 new Promise((resolve, reject) => {
            //                     setTimeout(() => {
            //                         const dataUpdate = [...data];
            //                         const index = dataUpdate.findIndex(item => item.id === oldData.id);
            //                         dataUpdate[index] = newData;
            //                         this.setState({data: dataUpdate});
            //
            //                         appAxios({
            //                             url: `users`,
            //                             method: 'PUT',
            //                             data: newData
            //                         }).then((response) => {
            //                             const message = response.headers["x-mrts-backend-params"];
            //                             toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
            //                                 closeButton: false
            //                             });
            //                         });
            //
            //                         resolve();
            //                     }, 1000)
            //                 }),
            //         }}
            //         options={{
            //             actionsColumnIndex: 999,
            //             search: false,
            //             pageSize: 20,
            //             pageSizeOptions: [20, 50, 100],
            //             filtering: true
            //         }}
            //     />
            // </React.Fragment>
        )
    }
}
