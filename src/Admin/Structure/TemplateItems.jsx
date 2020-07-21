import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class AdminStructureTemplateItemsPage extends React.Component {

    state = {
        data: [],
        isLoading: true,
        templates: [],
        properties: []
    };

    getProperties = () => appAxios.get(`user-properties`).catch(err => null);
    getTemplates = () => appAxios.get(`project-templates`).catch(err => null);
    getTemplateItems = () => appAxios.get(`project-template-items`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProperties, rTemplates, rTemplateItems] = await Axios.all([this.getProperties(), this.getTemplates(), this.getTemplateItems()]);

            const rPropertiesList = rProperties.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rPropertiesListMod = rPropertiesList.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            const rTemplatesLis = rTemplates.data.map(item => {
                return {id: item.id, name: item.name};
            });

            const rTemplatesListMod = rTemplatesLis.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.name;
                return acc;
            }, {});

            this.setState(
                {
                    data: rTemplateItems.data,
                    isLoading: false,
                    properties: rProperties.data,
                    propertiesList: rPropertiesListMod,
                    templates: rTemplates.data,
                    templatesList: rTemplatesListMod,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'projectTemplateId', title: 'Шаблон проекта', lookup: this.state.templatesList},
            {field: 'userPropertyId', title: 'Показатель', lookup: this.state.propertiesList},
        ];

        console.log(this.state);

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Элементы карточки проектов"
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
                                                url: `project-template-items`,
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
                                                url: `project-template-items`,
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
                                                url: `project-template-items/${oldData.id}`,
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