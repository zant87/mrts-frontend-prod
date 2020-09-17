import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import Axios from "axios";
import ProjectExtTable from "./ProjectExtTable";
import ProjectResTable from "./ProjectResTable";

export default class OperatorReportProjectsMasterEditPage extends React.Component {

    state = {
        project: {},
        isLoading: true
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.data;
    }

    //mts_project_report
    //mts_project_res - по projectId, idDoc,
    //v_k_7_detail
    getProject = () => appAxios.get(`projects/${this.state.projectId}`).catch(err => null);
    getDocument = () => appAxios.get(`documents/${this.state.documentId}`).catch(err => null);

    async componentDidMount() {
        try {
            console.log('Props =', this.props);

            const [rProject, rDocument, rProjectRes] = await Axios.all([
                this.getProject(),
                this.getDocument(),
            ]);

            this.setState(
                {
                    project: rProject.data,
                    document: rDocument.data,
                    isLoading: false,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    doSave = (close) => {

        const responseData = {
            id: this.state.id,
            documentId: this.state.documentId,
            projectId: this.state.projectId,
            description: this.state.description,
            factFinished: this.state.factFinished,
            factStarted: this.state.factStarted,
            done: this.state.done
        };

        appAxios({
            url: `project-reports`,
            method: 'PUT',
            data: responseData
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно обновлена запись с ID ${message}`, {
                closeButton: false
            });
            this.props.tableRef.current.onQueryChange();
            if (close) {
                this.props.toggleModal();
            }
        });
    }

    doBack = () => {
        history.back();
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {

        return (
            <div className="scrollbar my-1 mx-auto" style={{maxHeight: '85vh'}}>
                {this.state.project && (
                    <MDBInput outline label="Проект" value={this.state.project.name} disabled={true}
                              type="text"/>
                )}
                {this.state.document && (
                    <MDBInput outline label="Отчетный год" value={this.state.document.yearYear}
                              disabled={true}
                              type="number"/>
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
                                                  name='planBeginYear' value={this.state.planBeginYear}
                                                  disabled={true}
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
                                        <MDBInput outline label="Начало фактическое, год"
                                                  onChange={this.onChangeHandler}
                                                  name='factStarted' value={this.state.factStarted} type="number"/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput outline label="Окончание фактическое, год"
                                                  onChange={this.onChangeHandler}
                                                  name='factFinished' value={this.state.factFinished}
                                                  type="number"/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    )}
                </React.Fragment>
                {this.state.project && (
                    <MDBInput outline label="Уровень технической готовности, %"
                              onChange={this.onChangeHandler}
                              name='done'
                              value={this.state.done} type="number"/>
                )}
                {this.state.project && (
                    <React.Fragment>
                        <MDBRow center>
                            <h5>Финансирование проекта</h5>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol className="mb-3">
                                <MDBInput outline label="Плановая стоимость, сумма в млн. руб."
                                          name='planCost'
                                          disabled={true}
                                          value={this.state.planCost}
                                          type="number"/>
                            </MDBCol>
                            <MDBCol className="mb-3">
                                <MDBInput outline label="Фактическая стоимость, сумма в млн. руб."
                                          name='fact'
                                          disabled={true}
                                          value={this.state.fact}
                                          type="number"/>
                            </MDBCol>
                        </MDBRow>
                    </React.Fragment>
                )}
                {this.state.project && (

                    <MDBInput label="Комментарий о выполнении мероприятия"
                              onChange={this.onChangeHandler}
                              name='description'
                              value={this.state.description}
                              rows="5" type="textarea"/>

                )}

                <ProjectExtTable projectId={this.state.projectId} documentId={this.state.documentId}/>
                <ProjectResTable projectId={this.state.projectId} documentId={this.state.documentId}
                                 projectReportId={this.state.id}/>

                {this.props.editable && (
                    <MDBRow around className='mt-2'>
                        <MDBBtn color="primary" type="none" onClick={() => this.doSave()}>
                            Сохранить
                        </MDBBtn>
                        <MDBBtn color="primary" type="none" onClick={() => this.doSave(true)}>
                            Сохранить и закрыть
                        </MDBBtn>
                    </MDBRow>
                )
                }


            </div>
        );
    }
}
