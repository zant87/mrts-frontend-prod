import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast,} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from 'axios';
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class AdminStructurePropertiesPage extends React.Component {

    state = {
        data: [],
        isLoading: true,
        dataTypes: [],
        okeis: []
    };

    getDataTypes = () => appAxios.get(`data-types`).catch(err => null);
    getOkeis = () => appAxios.get(`nsi-okeis`).catch(err => null);
    getProperties = () => appAxios.get(`user-properties`).catch(err => null);

    async componentDidMount() {
        try {
            const [rDataTypes, rOkeis, rProperties] = await Axios.all([this.getDataTypes(), this.getOkeis(), this.getProperties()]);

            const rDataTypesList = rDataTypes.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rDataTypesListMod = rDataTypesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            const rOkeisList = rOkeis.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rOkeisListMod = rOkeisList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    dataTypes: rDataTypes.data,
                    okeis: rOkeis.data,
                    data: rProperties.data,
                    isLoading: false,
                    dataTypesList: rDataTypesListMod,
                    okeisList: rOkeisListMod
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'code', title: 'Код'},
            {field: 'name', title: 'Наименование'},
            {field: 'dataTypeId', title: 'Тип данных', lookup: this.state.dataTypesList},
            {field: 'okeiId', title: 'Единица измерения', lookup: this.state.okeisList},
        ];

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Показатели шаблонов проектов"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            localization={ruLocalization}
                            options={{
                                search: false,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                actionsColumnIndex: 999,
                            }}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataNew = [...data];

                                            const responseData = {
                                                code: newData.code,
                                                name: newData.name,
                                                dataTypeId: newData.dataTypeId,
                                                okeiId: newData.okeiId,
                                            };

                                            appAxios({
                                                url: `user-properties`,
                                                method: 'POST',
                                                data: responseData
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно добавлена запись с ID ${message}`, {
                                                    closeButton: false
                                                });
                                                newData.id = message;
                                                dataNew.push(newData);
                                                this.setState({data: dataNew});
                                            });

                                            resolve();
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                            dataUpdate[index] = newData;

                                            const responseData = {
                                                id: newData.id,
                                                code: newData.code,
                                                name: newData.name,
                                                dataTypeId: newData.dataTypeId,
                                                okeiId: newData.okeiId,
                                            };

                                            appAxios({
                                                url: `user-properties`,
                                                method: 'PUT',
                                                data: responseData
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно обновлена запись с ID ${message}`, {
                                                    closeButton: false
                                                });
                                            });

                                            this.setState({data: dataUpdate});
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {

                                            const dataDelete = [...data];
                                            const index = dataDelete.findIndex(item => item.id === oldData.id);

                                            appAxios({
                                                url: `user-properties/${oldData.id}`,
                                                method: 'DELETE',
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Удалена запись с ID ${message}`, {
                                                    closeButton: false
                                                });
                                            });

                                            dataDelete.splice(index, 1);

                                            this.setState({data: dataDelete});
                                            resolve();
                                        }, 1000)
                                    }),
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
