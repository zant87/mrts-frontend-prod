//OperatorCalculationValuesPage
import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import moment from "moment";
import appAxios from "../../_services/appAxios";

export default class OperatorCalculationValuesPage extends React.Component {

    state = {
        date: "2019-12-31",
        algorithmList: [],
        algorithmCode: "",
        providerList: [],
        providerCode: "",
        isLoading: false,
        result: ""
    };

    componentDidMount() {
        this.getAlgorithmList();
        this.getProviderList();
    };

    getAlgorithmList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/algorithms`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.code, text: item.name, checked: false};
                })
                this.setState({algorithmList: data, isLoading: false});
            })
    };

    setAlgorithm = event => {
        console.log('algorithmCode = ', event.toString());
        this.setState({algorithmCode: event.toString()});
    }

    getProviderList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-data-providers`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.code, text: item.year, checked: false};
                })
                this.setState({providerList: data, isLoading: false});
            })
    };

    setProvider = event => {
        console.log('providerCode = ', event.toString());
        this.setState({providerCode: event.toString()});
    }

    doCalculate = () => {

        console.log(this.state);

        /*
            @RequestParam("code") String code,
            @RequestParam("date") LocalDate date,
            @RequestParam(name = "provider", required = false, defaultValue = "") String provider)
        * */

        this.setState({ isLoading: true });
        const url =  this.state.providerCode ? `calculation/indicator-by-algorithm?code=${this.state.algorithmCode}&date=${this.state.date}&provider=${this.state.providerCode}`
            : `calculation/indicator-by-algorithm?code=${this.state.algorithmCode}&date=${this.state.date}`;

        console.log(url);

        appAxios.get(url)
            .then(res => {
                console.log(res.data);
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешно выполнен расчет индикатора`, {
                    closeButton: false
                });
            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при выполнении расчета индикатора`, {
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
            <MDBCol md='8' className='mx-auto my-5'>
                <h2 className='text-center my-2'>Расчет значений индикаторов за отчетный период</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.algorithmList}
                                   getValue={this.setAlgorithm}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'provider'}
                                   label="Источник данных"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.providerList}
                                   getValue={this.setProvider}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Дата документа</label>
                        <MDBDatePicker getValue={this.getDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='documentDate'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.date)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">
                                Результат расчета
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                                value={this.state.result}
                            />
                        </div>
                        {/*<MDBInput type="textarea" label="Результат" value={this.state.result} rows="5" disabled={true}/>*/}
                    </MDBCol>
                </MDBRow>

                <MDBRow around={true}>
                    <MDBBtn color="primary" type="none" onClick={this.doCalculate}>
                        Раcсчитать
                    </MDBBtn>
                </MDBRow>

            </MDBCol>
        );
    }
}
