import React from 'react';
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import StringFilter from "../../Common/Filters/StringFilter";
import NumericFilter from "../../Common/Filters/NumericFilter";
import AdminControlExecutorsEditPage from "./Executors/ExecutorsEdit";
import AdminControlEmissEditPage from "./Emiss/EmissEdit";

export default class AdminControlEmissPage extends React.Component {

    state = {
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            name: {
                type: "text",
                operator: "contains",
                value: null
            },
            responsible: {
                type: "text",
                operator: "contains",
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
            }
        },
        modal: false,
        row: {},
        action: ''
    };

    tableRef = React.createRef();

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
    }

    toggleModal = (rowData, action) => {
        this.setState({
            row: rowData,
            modal: !this.state.modal,
            action: action
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
                field: 'name', title: 'Наименование формы', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'responsible', title: 'Отвественный', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
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
                field: 'phone', title: 'Телефон', filtering: true,
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
                    this.toggleModal(rowData, 'edit');
                }
            },
            {
                icon: 'delete',
                tooltip: 'Удалить',
                onClick: (event, rowData) => {
                    console.log('Deleting row =', rowData);
                    appAxios({
                        url: `emiss-forms/${rowData.id}`,
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
                onClick: (event, rowData) => {
                    console.log('Adding row =', rowData);
                    this.toggleModal(rowData, 'add');
                },
                isFreeAction: true
            },
        ];

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={"Реестр исполнителей"}
                    baseUrl={"emiss-forms-page"}
                    tableRef={this.tableRef}
                    actions={actions}
                    filtersList={this.state.filtersList}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true}>
                        <MDBModalHeader toggle={this.toggleModal}>Редактирование</MDBModalHeader>
                        <MDBModalBody>
                            <AdminControlEmissEditPage
                                action={this.state.action}
                                data={this.state.row}
                                tableRef={this.tableRef}
                                toggleModal={this.toggleModal}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
                {/*<MaterialTable*/}
                {/*    title="Ответственные за подготовку данных Росстата"*/}
                {/*    columns={columns}*/}
                {/*    tableRef={tableRef}*/}
                {/*    isLoading={isLoading}*/}
                {/*    localization={ruLocalization}*/}
                {/*    data={data}*/}
                {/*    editable={{*/}
                {/*        onRowAdd: newData =>*/}
                {/*            new Promise((resolve, reject) => {*/}
                {/*                setTimeout(() => {*/}
                {/*                    const dataNew = [...data];*/}
                {/*                    appAxios({*/}
                {/*                        url: `emiss-forms`,*/}
                {/*                        method: 'POST',*/}
                {/*                        data: newData*/}
                {/*                    }).then((response) => {*/}
                {/*                        const message = response.headers["x-mrts-backend-params"];*/}
                {/*                        toast.success(`Успешно добавлена запись с ID ${message}`, {*/}
                {/*                            closeButton: false*/}
                {/*                        });*/}
                {/*                        newData.id = message;*/}
                {/*                        dataNew.push(newData);*/}
                {/*                        this.setState({data: dataNew});*/}
                {/*                    });*/}

                {/*                    resolve();*/}
                {/*                }, 1000)*/}
                {/*            }),*/}

                {/*        onRowUpdate: (newData, oldData) =>*/}
                {/*            new Promise((resolve, reject) => {*/}
                {/*                setTimeout(() => {*/}
                {/*                    const dataUpdate = [...data];*/}
                {/*                    const index = dataUpdate.findIndex(item => item.id === oldData.id);*/}
                {/*                    dataUpdate[index] = newData;*/}
                {/*                    this.setState({data: dataUpdate});*/}

                {/*                    appAxios({*/}
                {/*                        url: `emiss-forms`,*/}
                {/*                        method: 'PUT',*/}
                {/*                        data: newData*/}
                {/*                    }).then((response) => {*/}
                {/*                        const message = response.headers["x-mrts-backend-params"];*/}
                {/*                        toast.success(`Успешно обновлена запись с ID ${newData.id}`, {*/}
                {/*                            closeButton: false*/}
                {/*                        });*/}
                {/*                    });*/}

                {/*                    resolve();*/}
                {/*                }, 1000)*/}
                {/*            }),*/}
                {/*        onRowDelete: oldData =>*/}
                {/*            new Promise((resolve, reject) => {*/}
                {/*                setTimeout(() => {*/}

                {/*                    const dataDelete = [...data];*/}
                {/*                    const index = dataDelete.findIndex(item => item.id === oldData.id);*/}

                {/*appAxios({*/}
                {/*    url: `emiss-forms/${oldData.id}`,*/}
                {/*    method: 'DELETE',*/}
                {/*}).then((response) => {*/}
                {/*    const message = response.headers["x-mrts-backend-params"];*/}
                {/*    toast.success(`Удалена запись с ID ${message}`, {*/}
                {/*        closeButton: false*/}
                {/*    });*/}
                {/*});*/}

                {/*                    dataDelete.splice(index, 1);*/}

                {/*                    this.setState({data: dataDelete});*/}
                {/*                    resolve();*/}
                {/*                }, 1000)*/}
                {/*            }),*/}

                {/*    }}*/}
                {/*    options={{*/}
                {/*        actionsColumnIndex: 999,*/}
                {/*        search: false,*/}
                {/*        pageSize: 20,*/}
                {/*        pageSizeOptions: [20, 50, 100],*/}
                {/*        filtering: true*/}
                {/*    }}*/}
                {/*/>*/}
            </React.Fragment>
        )
    }
}
