import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class AdminStructureProjectsExtensionPage extends React.Component {

    state = {
        data: [],
        isLoading: true
    };

    getProjects = () => appAxios.get(`projects`).catch(err => null);
    getProperties = () => appAxios.get(`user-properties`).catch(err => null);
    getDocuments = () => appAxios.get(`documents`).catch(err => null);
    getProjectsExt = () => appAxios.get(`project-extendeds`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProjects, rProperties, rDocuments, rProjectsExt] = await Axios.all([this.getProjects(), this.getProperties(), this.getDocuments(), this.getProjectsExt()]);

            const rProjectsList = rProjects.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rProjectsListMod = rProjectsList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            const rPropertiesList = rProperties.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rPropertiesListMod = rPropertiesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            const rDocumentsList = rDocuments.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rDocumentsListMod = rDocumentsList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    projects: rProjects.data,
                    projectsList: rProjectsListMod,
                    properties: rProperties.data,
                    propertiesList: rPropertiesListMod,
                    documents: rDocuments.data,
                    documentsList: rDocumentsListMod,
                    data: rProjectsExt.data,
                    isLoading: false,

                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'projectId', title: 'Проект', lookup: this.state.projectsList},

            {field: 'userPropertyId', title: 'Свойство', lookup: this.state.propertiesList},

            {field: 'documentId', title: 'Документ', lookup: this.state.documentsList},
            {field: 'documentDate', title: 'Дата документа', type: 'date'},

            {field: 'numberValue', title: 'Числовое значение'},
            {field: 'stringValue', title: 'Строковое значение'},
        ];

        console.log(this.state);

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Отчет по проекту"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            tableLayout={'fixed'}
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

                                            const responseData = newData;

                                            appAxios({
                                                url: `project-extendeds`,
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

                                            const responseData = newData;

                                            appAxios({
                                                url: `project-extendeds`,
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
                                                url: `project-extendeds/${oldData.id}`,
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
