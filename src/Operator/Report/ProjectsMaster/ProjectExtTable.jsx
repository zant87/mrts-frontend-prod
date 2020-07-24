import React from "react";
import appAxios from "../../../_services/appAxios";
import Axios from "axios";
import {ruLocalization} from "../../../_components";
import {toast} from "mdbreact";
import MaterialTable from "material-table";

export default class OperatorReportProjectsExtTable extends React.Component {

    state = {
        isLoading: true
    };

    getProjectsExt = () => appAxios.get(`project-extendeds?projectId.equals=${this.props.projectId}`).catch(err => null);
    getProperties = () => appAxios.get(`user-properties`).catch(err => null);

    constructor(props) {
        super(props);
        console.log('Props in ProjectExtComponent =', props);
        this.state = this.props;
    }

    async componentDidMount() {
        try {
            const [rProjectExt, rProperties] = await Axios.all([
                this.getProjectsExt(),
                this.getProperties()
            ]);

            const rPropertiesList = rProperties.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rPropertiesListMod = rPropertiesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    projectsExt: rProjectExt.data,
                    propertiesList: rPropertiesListMod,
                    isLoading: false,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    render() {

        const columnsProjectsExt = [
            {field: 'userPropertyId', title: 'Свойство', lookup: this.state.propertiesList},
            {field: 'numberValue', title: 'Числовое значение'},
            {field: 'stringValue', title: 'Строковое значение'},
        ];

        const tableProjectsExt = React.createRef();
        const {projectsExt, isLoading} = this.state;

        return (
            <MaterialTable
                title="Отдельные показатели проекта"
                columns={columnsProjectsExt}
                tableRef={tableProjectsExt}
                data={projectsExt}
                tableLayout={'fixed'}
                localization={ruLocalization}
                options={{
                    pageSize: 20,
                    pageSizeOptions: [20, 50, 100],
                    actionsColumnIndex: 999,
                    filtering: false,
                    search: false,
                    paging: false
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {

                                const dataNew = [...projectsExt];

                                const responseData = {
                                    documentId: this.state.documentId,
                                    projectId: this.state.projectId,
                                    numberValue: newData.numberValue,
                                    stringValue: newData.stringValue,
                                    userPropertyId: newData.userPropertyId,
                                };

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
                                    this.setState({projectsExt: dataNew});
                                });

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...projectsExt];
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

                                this.setState({projectsExt: dataUpdate});
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {

                                const dataDelete = [...projectsExt];
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

                                this.setState({projectsExt: dataDelete});
                                resolve();
                            }, 1000)
                        }),
                }}
            />
        );
    }
}
