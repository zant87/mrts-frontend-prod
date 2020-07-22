import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect, MDBDatePicker} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";
import moment from "moment";

export default class AdminStructureTemplateEditPage extends React.Component {

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

        this.state.id = props.data.id;
        this.state.code = props.data.code;
        this.state.name = props.data.name;
        this.state.description = props.data.description;
        this.state.projectId = props.data.projectId;
        this.state.beginDate = props.data.beginDate;
        this.state.endDate = props.data.endDate;
    }

    setProject = event => {
        console.log('projectId =', event[0]);
        this.setState({projectId: event[0]});
    }

    doSave = (e) => {

        if (this.props.action === 'edit') {

            const responseData = {
                id: this.state.id,
                code: this.state.code,
                name: this.state.name,
                description: this.state.description,
                projectId: this.state.projectId,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate
            };

            console.log(responseData);

            appAxios({
                url: `project-templates`,
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
                code: this.state.code,
                name: this.state.name,
                description: this.state.description,
                projectId: this.state.projectId,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate
            };

            console.log(responseData);

            appAxios({
                url: `project-templates`,
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

    getBeginDate = (value) => {
        const date = moment(value);
        this.setState({beginDate: date.format('YYYY-MM-DD')});
    }

    getEndDate = (value) => {
        const date = moment(value);
        this.setState({endDate: date.format('YYYY-MM-DD')});
    }

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

                    <MDBInput label="Код"
                              value={this.state.code}
                              outline={true}
                              onChange={e => this.onChangeHandler(e)}
                              name="code"
                              type="textarea" rows={2}
                    />

                    <MDBInput label="Наименование"
                              value={this.state.name}
                              outline={true}
                              name="name"
                              onChange={e => this.onChangeHandler(e)}
                              type="textarea" rows={2}
                    />

                    <MDBInput label="Описание"
                              value={this.state.description}
                              outline={true}
                              name="description"
                              onChange={e => this.onChangeHandler(e)}
                              type="textarea" rows={3}
                    />

                    <label htmlFor='beginDate'>Начало действия</label>
                    <MDBDatePicker getValue={this.getBeginDate}
                                   format='YYYY-MM-DD'
                                   locale={moment.locale('ru')}
                                   okLabel='ОК'
                                   name='beginDate'
                                   keyboard={true}
                                   outline
                                   invalidDateMessage='Неправильный формат даты'
                                   valueDefault={new Date(this.state.beginDate)}
                                   cancelLabel='Отмена'/>

                    <label htmlFor='endDate'>Конец действия</label>
                    <MDBDatePicker getValue={this.getEndDate}
                                   format='YYYY-MM-DD'
                                   locale={moment.locale('ru')}
                                   okLabel='ОК'
                                   name='endDate'
                                   keyboard={true}
                                   outline
                                   invalidDateMessage='Неправильный формат даты'
                                   valueDefault={new Date(this.state.endDate)}
                                   cancelLabel='Отмена'/>

                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
