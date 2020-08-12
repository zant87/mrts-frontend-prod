import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {authenticationService} from "@/_services";
import Axios from "axios";
import moment from "moment";
import {signingData} from "../../_helpers/signing";

export default class AdminExecutorsByIndicatorEditPage extends React.Component {

    state = {
        userId: 0,
        indicatorId: 0,
        documentTypeId: 0,
        beginDate: '2020-01-01',
        endDate: '2099-12-31',
        role: 'AGREE',
        initialized: false
    };

    constructor(props) {
        super(props);

        this.state.users = props.users.map(item => {
                return {value: item.id, text: item.fullname, checked: false};
            }
        );

        this.state.indicators = props.indicators.map(item => {
                return {value: item.id, text: item.name, checked: false};
            }
        );

    };

    setBeginDate = (value) => {
        const date = moment(value);
        this.setState({beginDate: date.format('YYYY-MM-DD')});
    }

    setEndDate = (value) => {
        const date = moment(value);
        this.setState({endDate: date.format('YYYY-MM-DD')});
    }

    doSave = (e) => {

        const data = {
            role: this.state.role,
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            executorId: this.state.userId,
            documentTypeId: this.state.documentTypeId
        };

        console.log(data);

        appAxios({
            url: `document-agreement-settings`,
            method: 'POST',
            data: data
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно обновлена запись с ID ${message}`, {
                closeButton: false
            });
            this.props.tableRef.current.onQueryChange();
        });
    }

    setIndicator = (e) => {
        const indicator = this.props.indicators.find(x => x.id === Number(e));
        console.log(indicator);
        this.setState({
            indicatorId: indicator.id,
            documentTypeId: indicator.documentTypeId,
        });
    }

    setUser = (e) => {
        this.setState({
            userId: Number(e)
        });
    }

    setRole = (e) => {
        this.setState({
            role: String(e)
        });
    }

    render() {

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBSelect label="Индикатор"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.indicators}
                               outline={true}
                               getValue={e => this.setIndicator(e)}
                    />
                    <MDBSelect label="Пользователь"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.users}
                               outline={true}
                               getValue={e => this.setUser(e)}
                    />
                    <MDBSelect label="Роль"
                               search={true}
                               searchLabel={'Поиск'}
                               options={signingData}
                               outline={true}
                               getValue={e => this.setRole(e)}
                    />
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label htmlFor='datepicker'>Начало действия</label>
                            <MDBDatePicker getValue={this.setBeginDate}
                                           format='YYYY-MM-DD'
                                           locale={moment.locale('ru')}
                                           okLabel='ОК'
                                           name='documentDate'
                                           keyboard={true}
                                           outline
                                           invalidDateMessage='Неправильный формат даты'
                                           valueDefault={new Date(this.state.beginDate)}
                                           cancelLabel='Отмена'/>

                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label htmlFor='datepicker'>Конец действия</label>
                            <MDBDatePicker getValue={this.setEndDate}
                                           format='YYYY-MM-DD'
                                           locale={moment.locale('ru')}
                                           okLabel='ОК'
                                           name='documentDate'
                                           keyboard={true}
                                           outline
                                           invalidDateMessage='Неправильный формат даты'
                                           valueDefault={new Date(this.state.endDate)}
                                           cancelLabel='Отмена'/>

                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Создать
                    </MDBBtn>
                </div>
            </MDBContainer>
        )
    }

}
