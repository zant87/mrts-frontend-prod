import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";

export default class AdminStructureProjectsExtensionEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {
        super(props);
        console.log('Props in constructor =', props);

        this.state.projects = props.projects.map(item => {
                if (item.id === props.data.projectId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.documents = props.documents.map(item => {
                if (item.id === props.data.documentId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.properties = props.properties.map(item => {
                if (item.id === props.data.userPropertyId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.id = props.data.id;
        this.state.projectId = props.data.projectId;
        this.state.documentId = props.data.documentId;
        this.state.userPropertyId = props.data.userPropertyId;
        this.state.stringValue = props.data.stringValue;
        this.state.numberValue = props.data.numberValue;

    }

    setProject = event => {
        console.log('projectId =', event[0]);
        this.setState({projectId: event[0]});
    }

    setDocument = event => {
        console.log('documentId =', event[0]);
        this.setState({documentId: event[0]});
    }

    setProperty = event => {
        console.log('userPropertyId =', event[0]);
        this.setState({userPropertyId: event[0]});
    }

    doSave = (e) => {

        if (this.props.action === 'edit') {

            const responseData = {
                id: this.state.id,
                projectId: this.state.projectId,
                documentId: this.state.documentId,
                userPropertyId: this.state.userPropertyId,
                stringValue: this.state.stringValue,
                numberValue: this.state.numberValue
            };

            console.log(responseData);

            appAxios({
                url: `project-extendeds`,
                method: 'PUT',
                data: responseData
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно обновлена запись с ID ${message}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
            });
        } else {

            const responseData = {
                projectId: this.state.projectId,
                documentId: this.state.documentId,
                userPropertyId: this.state.userPropertyId,
                stringValue: this.state.stringValue,
                numberValue: this.state.numberValue
            };

            console.log(responseData);

            appAxios({
                url: `project-extendeds`,
                method: 'POST',
                data: responseData
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
            });

        }
    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    };

    render() {

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.props.data.id} disabled={true} outline={true} type="number"/>

                    <MDBSelect label="Проект"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.projects}
                               outline={true}
                               getValue={this.setProject}
                    />

                    <MDBSelect label="Документ"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.documents}
                               outline={true}
                               getValue={this.setDocument}
                    />

                    <MDBSelect label="Показатель"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.properties}
                               outline={true}
                               getValue={this.setProperty}
                    />

                    <MDBInput label="Числовое значение"
                              value={this.state.numberValue}
                              outline={true}
                              onChange={e => this.onChangeHandler(e)}
                              name="numberValue"
                              type="number"
                    />

                    <MDBInput label="Строковое значение"
                              value={this.state.stringValue}
                              outline={true}
                              name="stringValue"
                              onChange={e => this.onChangeHandler(e)}
                              type="text"
                    />

                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
