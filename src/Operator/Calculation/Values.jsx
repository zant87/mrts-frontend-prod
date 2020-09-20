import React from "react";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";
import { MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast, MDBDatePickerV5 } from "mdbreact";
import appAxios from "../../_services/appAxios";
import { authenticationService } from "../../_services";
import Preloader from "@/Common/Preloader/Preloader";

export default class OperatorCalculationValuesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "2018-12-31",
            algorithmList: [],
            algorithmListIsCalc: [],
            indsList: [],
            algorithmCode: "",
            providerList: [],
            providerCode: "",
            isLoading: false,
            result: "",
            username: "",
        };
    }

    // state = {
    //   date: "2018-12-31",
    //   algorithmList: [],
    //   algorithmListIsCalc: [],
    //   indsList: [],
    //   algorithmCode: "",
    //   providerList: [],
    //   providerCode: "",
    //   isLoading: false,
    //   result: "",
    //   username: "",
    // };

    //algorithmLists = [];

    componentDidMount() {
        this.getIndsList();
        this.getAlgorithmList();
        this.getProviderList();

        authenticationService.currentUser.subscribe((x) =>
            this.setState({
                username: x.id,
            })
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.algorithmList !== prevState.algorithmList || this.state.indsList !== prevState.indsList) {
            let algorithmLists = [];
            if (this.state.algorithmList.length > 0 && this.state.indsList.length > 0) {
                this.state.indsList.forEach((ind) => {
                    this.state.algorithmList.forEach((alg) => {
                        if (ind.id == alg.indicatorId) {
                            algorithmLists.push({
                                value: alg.code,
                                text: `${alg.name} (${alg.code.split("ALG_FOR_IND_")[1]})`,
                                checked: false
                            });
                        }
                    });
                });
                algorithmLists.sort((a, b) => (a.value > b.value ? 1 : -1));
                this.setState({algorithmListIsCalc: algorithmLists});
            }
        }
    }

    getAlgorithmList = () => {
        this.setState({isLoading: true});
        appAxios.get(`/algorithms`).then((res) => {
            const data = res.data.map((item) => {
                //return { value: item.code, text: item.name, checked: false };
                return {code: item.code, name: item.name, indicatorId: item.indicatorId};
            });
            this.setState({algorithmList: data, isLoading: false});
        });
    };

    getIndsList = () => {
        this.setState({isLoading: true});
        appAxios.get(`/indicators?isCalc.equals=1`).then((res) => {
            const data = res.data.map((item) => {
                return {id: item.id, name: item.name, isCalc: item.isCalc};
            });
            this.setState({indsList: data, isLoading: false});
        });
    };

    setAlgorithm = (event) => {
        console.log("algorithmCode = ", event.toString());
        this.setState({algorithmCode: event.toString()});
    };

    getProviderList = () => {
        this.setState({isLoading: true});
        appAxios.get(`/nsi-data-providers`).then((res) => {
            let selected;
            const data = res.data.map((item) => {
                return {value: item.code, text: item.name + ` (${item.code})`, checked: false};
            });
            this.setState({providerList: data, isLoading: false});
        });
    };

    setProvider = (event) => {
        console.log("providerCode = ", event.toString());
        this.setState({providerCode: event.toString()});
    };

    doCalcAndSave = () => {
        console.log(this.state);

        this.setState({isLoading: true});
        const url = `calculation/calc-and-save-indicator?algorithm=${this.state.algorithmCode}&date=${this.state.date}&provider=${this.state.providerCode}&username=${this.state.username}`;

        console.log(url);

        appAxios
            .get(url)
            .then((res) => {
                console.log(res.data);
                const data = res.data ? res.data : "Успех";
                this.setState({result: data, isLoading: false});

                if (res.data) {
                    toast.error(`Ошибка при выполнении расчета индикатора`, {
                        closeButton: false,
                    });
                } else {
                    toast.success(`Успешно выполнен расчет индикатора`, {
                        closeButton: false,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(`Ошибка при выполнении расчета индикатора`, {
                    closeButton: false,
                });
            });
    };

    doCalcAll = () => {
        console.log(this.state);

        this.setState({isLoading: true});
        const url = `calculation/calc-and-save-all?date=${this.state.date}&provider=${this.state.providerCode}&username=${this.state.username}`;

        console.log(url);

        appAxios
            .get(url)
            .then((res) => {
                console.log(res.data);

                const data = res.data ? res.data : "Успех";

                this.setState({result: data, isLoading: false});

                if (res.data) {
                    toast.error(`Ошибка при выполнении расчета индикатора`, {
                        closeButton: false,
                    });
                } else {
                    toast.success(`Успешно выполнен расчет индикатора`, {
                        closeButton: false,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(`Ошибка при выполнении расчета индикатора`, {
                    closeButton: false,
                });
            });
    };

    doCalculate = () => {
        console.log(this.state);

        this.setState({isLoading: true});
        const url = this.state.providerCode
            ? `calculation/indicator-by-algorithm?code=${this.state.algorithmCode}&date=${this.state.date}&provider=${this.state.providerCode}`
            : `calculation/indicator-by-algorithm?code=${this.state.algorithmCode}&date=${this.state.date}`;

        console.log(url);

        appAxios
            .get(url)
            .then((res) => {
                console.log(res.data);
                const data = res.data;

                if (res.data.includes('Нет данных')) {
                    toast.warning(`Не достаточно данных для расчета индикатора`, {
                        closeButton: false,
                    });
                } else {
                    toast.success(`Успешно выполнен расчет индикатора`, {
                        closeButton: false,
                    });
                }

                this.setState({result: data, isLoading: false});

            })
            .catch(function (error) {
                console.log(error);
                toast.error(`Ошибка при выполнении расчета индикатора`, {
                    closeButton: false,
                });
            });
    };

    getDate = (value) => {
        const date = moment(value);
        this.setState({date: date.format("YYYY-MM-DD")});
    };

    render() {
        return (
            <MDBCol md="8" className="mx-auto my-3">
                <h2 className="text-center my-3">Расчет значений индикаторов за отчетный период</h2>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect
                            searchId={"algorithm"}
                            label="Алгоритм"
                            search={true}
                            searchLabel={"Поиск"}
                            outline
                            options={this.state.algorithmListIsCalc.length > 0 ? this.state.algorithmListIsCalc : ""}
                            getValue={this.setAlgorithm}
                        />
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect
                            searchId={"provider"}
                            label="Источник данных"
                            search={true}
                            outline
                            searchLabel={"Поиск"}
                            options={this.state.providerList}
                            getValue={this.setProvider}
                        />
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label htmlFor="datepicker">Дата документа</label>
                        <MDBDatePicker
                            getValue={this.getDate}
                            format="DD.MM.YYYY"
                            locale={moment.locale("ru")}
                            okLabel="Применить"
                            name="documentDate"
                            keyboard={true}
                            outline
                            invalidDateMessage="Неправильный формат даты"
                            valueDefault={new Date(this.state.date)}
                            cancelLabel="Отмена"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Результат расчета</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
                                      value={this.state.result}/>
                        </div>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        {this.state.isLoading ? <Preloader/> : ""}
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
                        Рассчитать все и сохранить
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        );
    }
}
