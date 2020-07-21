import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";

export default class OperatorReportProjectsMasterEditPage extends React.Component {

    state = {
        project: {},
        isLoading: true
    };

    constructor(props) {
        super(props);
        this.state = this.props.location.state;
    }

    //mts_project_report
    //mts_project_res - по projectId, idDoc,
    //v_k_7_detail
    getProject = () => appAxios.get(`projects/${this.state.projectId}`).catch(err => null);
    getDocument = () => appAxios.get(`documents/${this.state.documentId}`).catch(err => null);
    getProjectsExt = () => appAxios.get(`project-extendeds?projectId.equals=${this.state.projectId}`).catch(err => null);
    getProperties = () => appAxios.get(`user-properties`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProject, rDocument, rProjectsExt, rProperties] = await Axios.all([this.getProject(),
                this.getDocument(),
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
                    project: rProject.data,
                    document: rDocument.data,
                    projectsExt: rProjectsExt.data,
                    propertiesList: rPropertiesListMod,
                    isLoading: false,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    doSave = () => {
        // const responseData = {
        //     id: this.state.id,
        //     formula: this.state.formula
        // };
        //
        // appAxios({
        //     url: `indicators`,
        //     method: 'PUT',
        //     data: responseData
        // }).then((response) => {
        //     const message = response.headers["x-mrts-backend-params"];
        //     toast.success(`Успешно обновлена запись с ID ${message}`, {
        //         closeButton: false
        //     });
        // });
    }

    doBack = () => {
        history.back();
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
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
            <MDBCol md='8' className='mx-auto my-3'>
                <MDBRow center>
                    <h2 className='text-center my-2'>Редактирование крупных инвестиционных проектов</h2>
                </MDBRow>
                {this.state.project && (
                    <MDBRow around>
                        <MDBCol md="12" className="mb-3">
                            <MDBInput outline label="Проект" value={this.state.project.name} disabled={true}
                                      type="text"/>
                        </MDBCol>
                    </MDBRow>
                )}
                {this.state.document && (
                    <MDBRow around>
                        <MDBCol md="12" className="mb-3">
                            <MDBInput outline label="Отчетный год" value={this.state.document.yearYear} disabled={true}
                                      type="number"/>
                        </MDBCol>
                    </MDBRow>
                )}
                <React.Fragment>
                    {this.state.project && (
                        <MDBRow center>
                            <MDBCol className="mb-3">
                                <MDBRow center>
                                    <h5>Плановые сроки реализации проекта</h5>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput outline label="Начало плановое" onChange={this.onChangeHandler}
                                                  name='planBeginYear' value={this.state.planBeginYear} disabled={true}
                                                  type="number"/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput outline label="Окончание плановое" onChange={this.onChangeHandler}
                                                  name='planEndYear' value={this.state.planEndYear} disabled={true}
                                                  type="number"/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol className="mb-3">
                                <MDBRow center>
                                    <h5>Фактические сроки реализации проекта</h5>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput outline label="Начало фактическое" onChange={this.onChangeHandler}
                                                  name='factStarted' value={this.state.factStarted} type="number"/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput outline label="Конец фактический" onChange={this.onChangeHandler}
                                                  name='factFinished' value={this.state.factFinished} type="number"/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    )}
                </React.Fragment>
                {this.state.project && (
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <MDBInput outline label="Выполнение проекта"
                                      onChange={this.onChangeHandler}
                                      name='done'
                                      value={this.state.done} type="number"/>
                        </MDBCol>
                    </MDBRow>
                )}
                {this.state.project && (
                    <React.Fragment>
                        <MDBRow center>
                            <h5>Финансирование проекта</h5>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol className="mb-3">
                                <MDBInput outline label="Плановая стоимость, млрд. руб."
                                          onChange={this.onChangeHandler}
                                          disabled={true}
                                          name='planCost'
                                          value={this.state.planCost}
                                          type="number"/>
                            </MDBCol>
                            <MDBCol className="mb-3">
                                <MDBInput outline label="Фактическая стоимость, млрд."
                                          onChange={this.onChangeHandler}
                                          name='fact'
                                          value={this.state.fact}
                                          type="number"/>
                            </MDBCol>
                        </MDBRow>
                    </React.Fragment>
                )}
                {this.state.project && (
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <MDBInput label="Описание проекта"
                                      onChange={this.onChangeHandler}
                                      name='description'
                                      value={this.state.description}
                                      rows="5" type="textarea"/>
                        </MDBCol>
                    </MDBRow>
                )}
                {this.state.projectsExt && (
                    <MDBRow center className="mb-3">
                        <MDBCol md={'12'} className='my-2 mx-auto'>
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
                                                    documentId: this.state.document.id,
                                                    projectId: this.state.project.id,
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
                        </MDBCol>
                    </MDBRow>
                )}
                <MDBRow around>
                    <MDBBtn color="primary" type="none" onClick={this.doSave}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="info" type="none" onClick={this.doBack}>
                        Назад
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        );
    }
}
