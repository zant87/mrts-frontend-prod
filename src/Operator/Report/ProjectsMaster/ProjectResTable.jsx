import React from "react";
import appAxios from "../../../_services/appAxios";
import Axios from "axios";
import {ruLocalization} from "../../../_components";
import {toast} from "mdbreact";
import MaterialTable from "material-table";

export default class OperatorReportProjectsResTable extends React.Component {

    state = {
        isLoading: true
    };

    getProjectsRes = () => appAxios.get(`project-resources?projectId.equals=${this.props.projectId}&documentId.equals=${this.props.documentId}`).catch(err => null);

    constructor(props) {
        super(props);
        console.log('Props in ProjectResComponent =', props);
        this.state = this.props;
    }

    async componentDidMount() {
        try {
            const [rProjectsRes] = await Axios.all([
                this.getProjectsRes(),
            ]);

            this.setState(
                {
                    projectsRes: rProjectsRes.data,
                    isLoading: false,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    render() {

        const columnsProjectsRes = [
            {field: 'fundingName', title: 'Направление бюджета'},
            {field: 'plan', title: 'План', type: 'number'},
            {field: 'spent', title: 'Потрачено', type: 'number'},
            {field: 'fact', title: 'Факт', type: 'number'},
        ];

        const tableProjectsRes = React.createRef();
        const {projectsRes, isLoading} = this.state;

        return (
            <MaterialTable
                title="Финансирование проекта"
                columns={columnsProjectsRes}
                tableRef={tableProjectsRes}
                data={projectsRes}
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
                    // onRowAdd: newData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //
                    //             const dataNew = [...projectsRes];
                    //
                    //             const responseData = {
                    //                 documentId: this.props.documentId,
                    //                 projectId: this.props.projectId,
                    //                 plan: newData.plan,
                    //                 fact: newData.fact,
                    //                 spent: newData.spent,
                    //             };
                    //
                    //             appAxios({
                    //                 url: `project-resources`,
                    //                 method: 'POST',
                    //                 data: responseData
                    //             }).then((response) => {
                    //                 const message = response.headers["x-mrts-backend-params"];
                    //                 toast.success(`Успешно добавлена запись с ID ${message}`, {
                    //                     closeButton: false
                    //                 });
                    //                 newData.id = message;
                    //                 dataNew.push(newData);
                    //                 this.setState({projectsRes: dataNew});
                    //             });
                    //
                    //             resolve();
                    //         }, 1000)
                    //     }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...projectsRes];
                                const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                dataUpdate[index] = newData;

                                const responseData = newData;

                                appAxios({
                                    url: `project-resources`,
                                    method: 'PUT',
                                    data: responseData
                                }).then((response) => {
                                    const message = response.headers["x-mrts-backend-params"];
                                    toast.success(`Успешно обновлена запись с ID ${message}`, {
                                        closeButton: false
                                    });
                                });

                                this.setState({projectsRes: dataUpdate});
                                resolve();
                            }, 1000)
                        }),
                    // onRowDelete: oldData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //
                    //             const dataDelete = [...projectsRes];
                    //             const index = dataDelete.findIndex(item => item.id === oldData.id);
                    //
                    //             appAxios({
                    //                 url: `project-resources/${oldData.id}`,
                    //                 method: 'DELETE',
                    //             }).then((response) => {
                    //                 const message = response.headers["x-mrts-backend-params"];
                    //                 toast.success(`Удалена запись с ID ${message}`, {
                    //                     closeButton: false
                    //                 });
                    //             });
                    //
                    //             dataDelete.splice(index, 1);
                    //
                    //             this.setState({projectsRes: dataDelete});
                    //             resolve();
                    //         }, 1000)
                    //     }),
                }}
            />
        );
    }
}
