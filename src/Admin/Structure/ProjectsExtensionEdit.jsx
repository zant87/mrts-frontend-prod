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

        this.state.data = this.props.data;
        this.state.stringValue = this.props.data.stringValue;
        this.state.numberValue = this.props.data.numberValue;
        this.state.tableRef = this.props.tableRef;
    }

    setProject = event => {
        console.log(event);
        let data = this.state.data;
        data.projectId = event;
        this.setState({data: data});
    }

    setDocument = event => {
        console.log(event);
        let data = this.state.data;
        data.documentid = event;
        this.setState({data: data});
    }

    setProperty = event => {
        console.log(event);
        let data = this.state.data;
        data.userPropertyId = event;
        this.setState({data: data});
    }

    componentDidMount() {

        console.log('State in componentDidMount =', this.state);

    }

    doSave = () => {

        if (this.props.action === 'edit') {

            const responseData = {
                id: this.props.data.id,
                projectId: this.state.projectId,
                documentId: this.state.documentId,
                propertiesId: this.state.propertiesId,
                stringValue: this.state.stringValue,
                numberValue: this.state.numberValue
            };

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
        } else {
            const responseData = {
                projectId: this.state.projectId,
                documentId: this.state.documentId,
                propertiesId: this.state.propertiesId,
                stringValue: this.state.stringValue,
                numberValue: this.state.numberValue
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
                // newData.id = message;
                // dataNew.push(newData);
                // this.setState({data: dataNew});
            });
        }

        // let method = this.props.action === 'edit'? 'PUT' : 'POST';
        //
        // const responseData = {
        //     id: this.state.id,
        //     formula: this.state.formula
        // };
        //
        // // const responseData = {
        // //     id: this.state.id,
        // //     formula: this.state.formula
        // // };
        // //
        // // appAxios({
        // //     url: `indicators`,
        // //     method: 'PUT',
        // //     data: responseData
        // // }).then((response) => {
        // //     const message = response.headers["x-mrts-backend-params"];
        // //     toast.success(`Успешно обновлена запись с ID ${message}`, {
        // //         closeButton: false
        // //     });
        // // });

    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {

        console.log('Props in render =', this.props);
        console.log('State in render =', this.state);

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
                              onChange={this.onChangeHandler}
                              name="numberValue"
                              type="number"
                    />

                    <MDBInput label="Строковое значение"
                              value={this.state.stringValue}
                              outline={true}
                              name="stringValue"
                              onChange={this.onChangeHandler}
                              type="text"
                    />

                    <MDBBtn color="primary" type="none" onClick={this.doSave}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
