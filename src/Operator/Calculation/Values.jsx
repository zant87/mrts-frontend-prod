import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import moment from "moment";
import appAxios from "../../_services/appAxios";
import {authenticationService} from "../../_services";

export default class OperatorCalculationValuesPage extends React.Component {

    state = {
        date: "2018-12-31",
        algorithmList: [],
        algorithmCode: "",
        providerList: [],
        providerCode: "",
        isLoading: false,
        result: "",
        username: ""
    };

    componentDidMount() {
        this.getAlgorithmList();
        this.getProviderList();
        authenticationService.currentUser.subscribe((x) =>
            this.setState({
                username: x.id,
            })
        );
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

    doCalcAndSave = () => {
        console.log(this.state);

        this.setState({isLoading: true});
        const url = `calculation/calc-and-save-indicator?algorithm=${this.state.algorithmCode}&date=${this.state.date}&provider=${this.state.providerCode}&username=${this.state.username}`;

        console.log(url);

        appAxios.get(url)
            .then(res => {
                console.log(res.data);
                const data = res.data ? res.data : 'Успех';
                this.setState({result: data, isLoading: false});

                if (res.data) {
                    toast.error(`Ошибка при выполнении расчета индикатора`, {
                        closeButton: false
                    });
                } else {
                    toast.success(`Успешно выполнен расчет индикатора`, {
                        closeButton: false
                    });
                }

            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при выполнении расчета индикатора`, {
                closeButton: false
            });
        });
    }

    doCalcAll = () => {
        console.log(this.state);

        this.setState({isLoading: true});
        const url = `calculation/calc-and-save-all?date=${this.state.date}&provider=${this.state.providerCode}&username=${this.state.username}`;

        console.log(url);

        appAxios.get(url)
            .then(res => {
                console.log(res.data);

                const data = res.data ? res.data : 'Успех';

                this.setState({result: data, isLoading: false});

                if (res.data) {
                    toast.error(`Ошибка при выполнении расчета индикатора`, {
                        closeButton: false
                    });
                } else {
                    toast.success(`Успешно выполнен расчет индикатора`, {
                        closeButton: false
                    });
                }

            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при выполнении расчета индикатора`, {
                closeButton: false
            });
        });
    }

    doCalculate = () => {

        console.log(this.state);

        this.setState({isLoading: true});
        const url = this.state.providerCode ? `calculation/indicator-by-algorithm?code=${this.state.algorithmCode}&date=${this.state.date}&provider=${this.state.providerCode}`
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
            <MDBCol md='8' className='mx-auto my-3'>
                <h2 className='text-center my-3'>Расчет значений индикаторов за отчетный период</h2>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   outline
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
                                   outline
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
                                       outline
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
                    </MDBCol>
                </MDBRow>

                <MDBRow around={true}>
                    <MDBBtn color="primary" type="none" onClick={this.doCalculate}>
                        Рассчитать
                    </MDBBtn>
                    <MDBBtn color="primary" type="none" onClick={this.doCalcAndSave}>
                        Рассчитать и сохранить
                    </MDBBtn>
                    <MDBBtn color="primary" type="none" onClick={this.doCalcAll}>
                        Рассчитать все
                    </MDBBtn>
                </MDBRow>

            </MDBCol>
        );
    }
}
