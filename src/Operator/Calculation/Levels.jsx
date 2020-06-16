//OperatorCalculationValuesPage
import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import moment from "moment";
import appAxios from "../../_services/appAxios";

export default class OperatorCalculationLevelsPage extends React.Component {

    state = {
        date: "2019-12-31",
        isLoading: false,
        result: ""
    };

    doCalculate = () => {

        console.log(this.state);

        /*
            @RequestParam("date") LocalDate date)
        */

        this.setState({ isLoading: true });
        const url = `/calculation/indicator-level?date=${this.state.date}`;

        console.log(url);

        appAxios.get(url)
            .then(res => {
                console.log(res.data);
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешно выполнен расчет уровней и динамики`, {
                    closeButton: false
                });
            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при выполнении расчете уровней и динамики`, {
                closeButton: false
            });
        });
    };

    getDate = (value) => {
        const date = moment(value);
        this.setState({date: date.format('YYYY-MM-DD')});
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-3'>
                <h2 className='text-center my-3'>Расчет уровней и динамики достижения индикаторов</h2>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Дата документа</label>
                        <MDBDatePicker getValue={this.getDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='documentDate'
                                       keyboard={true}
                                       outline
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.date)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>
                </MDBRow>

                <MDBRow between={true}>
                        <MDBBtn color="primary" type="none" onClick={this.doCalculate}>
                            Раcсчитать
                        </MDBBtn>
                </MDBRow>

            </MDBCol>
        );
    }
}
