import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportActivitiesCreatePage extends React.Component {

    state = {
        year: 2020,
        quarter: 0,
        date: "2019-12-31",
        code: "Код тест 1",
        name: "Наименование тест 1",
        quarterList: [],
        isLoading: false,
        result: 0
    };

    componentDidMount() {
        this.getQuarterList();
    };

    getQuarterList = () => {
        this.setState({isLoading: true});
        axios.get(`/api/nsi-quarters`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
                })
                console.log(data);
                this.setState({quarterList: data, isLoading: false});
            });
    }

    setQuarter = event => {
        this.setState({quarter: event.toString()});
        console.log(this.state);
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    doCreate =() => {
        this.setState({ isLoading: true });
        axios.get(`/api/views/k-6-s/createActivityReportDoc?pYear=${this.state.year}&pQuarter=${this.state.quarter}&pIdDocDate=${this.state.date}&pCode=${this.state.code}&pName=${this.state.name}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({result: data, isLoading: false});
            });
    }

    doBack = () => {
        history.back();
    };

    getPickerValue = (value) => {
        const date = moment(value);
        console.log(date);
        this.setState({date: date.format('YYYY-MM-DD')});
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Создание документа основания</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год" value={this.state.year} type="number" name="year" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Квартал"
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Код" value={this.state.code} type="text" name="code" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Наименование" value={this.state.name} type="text" name="name" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor='datepicker'>Дата</label>
                        <MDBDatePicker getValue={this.getPickerValue}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='datepicker'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date("2019-12-31")}
                                       cancelLabel='Отмена'/>

                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBBtn color="primary" type="none" onClick={this.doCreate}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="info" type="none" onClick={this.doBack}>
                        Назад
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        )
    }
}
