import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class AdminStructureTemplatesPage extends React.Component {

    state = {
        data: [],
        isLoading: true,
        projects: []
    };

    getProjects = () => appAxios.get(`projects`).catch(err => null);
    getTemplates = () => appAxios.get(`project-templates`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProjects, rTemplates] = await Axios.all([this.getProjects(), this.getTemplates()]);

            const rProjectsList = rProjects.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rProjectsListMod = rProjectsList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    projects: rProjects.data,
                    data: rTemplates.data,
                    isLoading: false,
                    projectsList: rProjectsListMod
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
            {field: 'description', title: 'Описание'},
            {field: 'beginDate', title: 'Начало', type: 'date'},
            {field: 'endDate', title: 'Конец', type: 'date'},
            {field: 'projectId', title: 'Проект', lookup: this.state.projectsList},
        ];

        console.log(this.state);

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Шаблоны карточки проектов"
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

                                            const responseData = newData;

                                            appAxios({
                                                url: `project-templates`,
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
                                                url: `project-templates`,
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
                                                url: `project-templates/${oldData.id}`,
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
