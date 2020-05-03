import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import axios from "axios";
import moment from "moment";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingDocumentPage extends React.Component {

    state = {
        id: 0,
        code: "",
        name: "",
        description: "",
        beginDate: "2019-12-31",
        endDate: "2099-12-31",
        documentDate: "2019-12-31",
        documentTypeId: 0,
        yearId: 0,
        quarterId: 0,
        documentTypeList: [],
        yearList: [],
        quarterList: [],
        isLoading: false
    };

    componentDidMount() {
        this.getDocumentTypeList();
        this.getYearList();
        this.getQuarterList();
    };

    getDocumentTypeList = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/document-types`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
                })
                this.setState({documentTypeList: data, isLoading: false});
            })
    };

    setDocumentType = event => {
        this.setState({documentTypeId: event.toString()})
    }

    getYearList = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/nsi-years`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.year};
                })
                this.setState({yearList: data, isLoading: false});
            })
    };

    setYear = event => {
        this.setState({yearId: event.toString()})
    }

    getQuarterList = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/nsi-quarters`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
                })
                this.setState({quarterList: data, isLoading: false});
            })
    };

    setQuarter = event => {
        this.setState({quarterId: event.toString()})
    }

    onChangeHandler = event => {
        console.log(this.state);
        this.setState({[event.target.name]: event.target.value});
    };

    doSave = () => {

        const responseData = { code: this.state.code,
            name: this.state.name,
            description: this.state.description,
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            documentDate: this.state.documentDate,
            documentTypeId: this.state.documentTypeId,
            yearId: this.state.yearId,
            quarterId: this.state.quarterId
        };

        console.log(responseData);
        appAxios({
            url: `documents`,
            method: 'POST',
            data: responseData
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно создан документ с ID ${message}`, {
                closeButton: false
            });
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при создании документа`, {
                closeButton: false
            });
        });
    };

    doBack = () => {
        history.back();
    };

    getBeginDate = (value) => {
        const date = moment(value);
        this.setState({beginDate: date.format('YYYY-MM-DD')});
    }

    getEndDate = (value) => {
        const date = moment(value);
        this.setState({endDate: date.format('YYYY-MM-DD')});
    }

    getDocumentDate = (value) => {
        const date = moment(value);
        this.setState({documentDate: date.format('YYYY-MM-DD')});
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>
                <h2 className='text-center my-2'>Создание документа МРТС</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Код" value={this.state.code}  name="code" type="text" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Наименование" value={this.state.name} name="name" type="text" onChange={this.onChangeHandler} on/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput type="textarea" label="Описание" value={this.state.description} name="description" rows="3" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Начало действия документа</label>
                        <MDBDatePicker getValue={this.getBeginDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='beginDate'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.beginDate)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Конец действия документа</label>
                        <MDBDatePicker getValue={this.getEndDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='endDate'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.endDate)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Дата документа</label>
                        <MDBDatePicker getValue={this.getDocumentDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='documentDate'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.documentDate)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Тип документа"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.documentTypeList}
                                   getValue={this.setDocumentType}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Год"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.yearList}
                                   getValue={this.setYear}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Квартал"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
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
