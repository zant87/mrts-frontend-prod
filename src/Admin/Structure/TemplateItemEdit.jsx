import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect, MDBDatePicker} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";

export default class AdminStructureTemplateItemEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {
        super(props);
        console.log('Props in constructor =', props);

        this.state.projectTemplates = props.projectTemplates.map(item => {
                if (item.id === props.data.projectTemplateId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.userProperties = props.userProperties.map(item => {
                if (item.id === props.data.userPropertyId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.id = props.data.id;
        this.state.projectTemplateId = props.data.projectTemplateId;
        this.state.userPropertyId = props.data.userPropertyId;

    }

    setProject = event => {
        console.log('projectId =', event[0]);
        this.setState({projectTemplateId: event[0]});
    }

    setUserProperty = event => {
        console.log('userPropertyId =', event[0]);
        this.setState({userPropertyId: event[0]});
    }

    doSave = (e, close) => {

        if (this.props.action === 'edit') {

            const responseData = {
                id: this.state.id,
                projectTemplateId: this.state.projectTemplateId,
                userPropertyId: this.state.userPropertyId,
            };

            console.log(responseData);

            appAxios({
                url: `project-template-items`,
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
            
        } else {

            const responseData = {
                projectTemplateId: this.state.projectTemplateId,
                userPropertyId: this.state.userPropertyId,
            };

            console.log(responseData);

            appAxios({
                url: `project-template-items`,
                method: 'POST',
                data: responseData
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
                if (close) {
                    this.props.toggleModal();
                }
            });

        }
    }

    render() {


        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.props.data.id} disabled={true} outline={true} type="number"/>

                    <MDBSelect label="Шаблон проекта"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.projectTemplates}
                               outline={true}
                               getValue={e => this.setProject(e)}
                    />

                    <MDBSelect label="Показатель"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.userProperties}
                               outline={true}
                               getValue={e => this.setUserProperty(e)}
                    />

                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e, true)}>
                        Сохранить и закрыть
                    </MDBBtn>

                </div>
            </MDBContainer>
        );
    }
}
