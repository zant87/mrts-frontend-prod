import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, MDBSpinner, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from 'axios';
import {reportsData} from "./ReportsData";
import {element} from "prop-types";

class AnalystReportPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDownloading: false,
      labeling: false,
      start: 2015,
      end: 2020,
      isLoading: true,
      goal: {},
      goals: {},
      goalsSelectList: {},
      scenario: {},
      scenarios: {},
      scenariosSelectList: {},
      quarter: {},
      quarters: {},
      quartersSelectList: {},
      report: {},
      reports: reportsData,
      reportFormat: 'PDF',
      formats: [
        {
          text: "PDF",
          value: "PDF",
          checked: true,
        },
        {
          text: "XLSX",
          value: "XLSX",
        },
        {
          text: "DOCX",
          value: "DOCX",
        },
      ],
    };
  }

  getGoals = () => appAxios.get(`/goals?transportStrategyVersionActual.equals=true`).catch(err => console.log(err));
  getScenarios = () => appAxios.get(`/scenarios`).catch(err => console.log(err));
  getQuarters = () => appAxios.get(`/nsi-quarters`).catch(err => console.log(err));

  async componentDidMount() {
    try {

      const [goalsData, scenariosData, quartersData] = await axios.all([this.getGoals(), this.getScenarios(), this.getQuarters()]);

      this.setState(
          {

            goalsSelectList: goalsData.data.map(item => {
              return {value: item.name, text: item.description, checked: false}
            }),
            goals: goalsData.data,

            scenariosSelectList: scenariosData.data.map(item => {
              return {value: item.code, text: item.name, checked: false}
            }),
            scenarios: scenariosData.data,

            quartersSelectList: quartersData.data.map(item => {
              return {value: item.code, text: item.name, checked: false}
            }),

            quarters: quartersData.data,
            reports: reportsData,
            isLoading: false,
          }
      );

    } catch (err) {
      console.log(err.message);
      toast.error(`Ошибка при инициализации`, {
        closeButton: false
      });
    }
  }

  componentWillUnmount() {
    console.log(this.state);
  }

  setQuarter = (event) => {
    const filter = this.state.quarters.filter((quarter) => quarter.code === event.toString())[0];
    if (filter) {
      console.log('Quarter = ', filter);
      this.setState({quarter: filter});
    } else {
      this.setState({quarter: null});
    }
  }

  setScenario = (event) => {
    const filter = this.state.scenarios.filter((scenario) => scenario.code === event.toString())[0];
    if (filter) {
      console.log('Scenario = ', filter);
      this.setState({scenario: filter});
    } else {
      this.setState({scenario: null});
    }
  }

  setGoal = (event) => {
    const filter = this.state.goals.filter((goal) => goal.name === event.toString())[0];
    if (filter) {
      console.log('Goal = ', filter);
      this.setState({goal: filter});
    } else {
      this.setState({goal: null});
    }
  }

  setReportFormat = (event) => {
    const filter = event.toString();
    if (filter) {
      console.log('Report Format = ', filter);
      this.setState({reportFormat: filter});
    } else {
      this.setState({reportFormat: null});
    }
  };

  setReport = (event) => {
    const filter = this.state.reports.filter((report) => report.value === event.toString())[0];
    if (filter) {
      console.log('Report = ', filter);
      this.setState({report: filter});
    } else {
      this.setState({report: null});
    }
  };

  doDownload = async () => {

    let reportUrl;
    let reportName;

    if (this.state.report.type === 1) {
      //http://localhost:8080/api/reports/m1/download?format=DOCX&year=2015&goal_code=GOAL_06&quarter_code=1&scenario_code=BASE
      reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&goal_code=${this.state.goal.name}&quarter_code=${this.state.quarter.code}&scenario_code=${this.state.scenario.name}`;
      reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.goal.name}_${this.state.quarter.code}_${this.state.scenario.name}.${this.state.reportFormat}`;
    }

    if (this.state.report.type === 2) {
      //http://localhost:8080/api/reports/m5/download?format=DOCX&year=2015&quarter_code=1
      reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&quarter_code=${this.state.quarter.code}`;
      reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.quarter.code}.${this.state.reportFormat}`;
    }

    if (this.state.report.type === 3) {
      //http://localhost:8080/api/reports/m13/download?format=DOCX&start=2012
      reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}`;
      reportName = `report_${this.state.report.value}_${this.state.start}.${this.state.reportFormat}`;
    }

    if (this.state.report.type === 4) {
      //http://localhost:8080/api/reports/m14/download?format=PDF&start=2012&end=2020&label=true
      reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&start=${this.state.start}&end=${this.state.end}&label=${this.state.labeling}`;
      reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.end}.${this.state.reportFormat}`;
    }
    if (this.state.report.type === 5) {
      //http://localhost:8080/api/reports/m24/download?format=DOCX&start=2020&label=true
      reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&label=${this.state.labeling}`;
      reportName = `report_${this.state.report.value}_${this.state.start}.${this.state.reportFormat}`;
    }

    console.log('Retrieving URL = ', reportUrl);
    console.log('File Name = ', reportName);

    try {
      this.setState({isDownloading: false});

      let response = await appAxios({
        url: reportUrl,
        method: "GET",
        responseType: "blob",
      });

      let url = window.URL.createObjectURL(new Blob([response.data]));
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", reportName);
      document.body.appendChild(link);
      link.click();

      toast.success(`Отчет ${this.state.report.value} построен`);
      this.setState({isDownloading: false});
    } catch (e) {
      console.log(e);
      toast.error(`Ошибка при построении отчета ${this.state.report.value}`);
      this.setState({isLoading: false});
    }
  };

  onChangeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);
  };

  onChangeLabelHandler = (event) => {
    const inverseLabeling = !this.state.labeling;
    this.setState({labeling: inverseLabeling});
  }

  onSubmitHandler = async event => {
    event.preventDefault();
    event.target.className = "needs-validation was-validated"
    console.log(this.state);
    this.setState({isDownloading: true});
    await this.doDownload();
  };

  render() {

    return (
        <MDBCol md="8" className="mx-auto my-5">

          <h1 className="text-center my-3">Материалы доклада о реализации транспортной стратегии Российской
            Федерации</h1>

          {!this.state.isLoading && (
              <form className="needs-validation"
                    onSubmit={this.onSubmitHandler}>
                <MDBRow>
                  <MDBCol md="12" className="mb-5">
                    <MDBSelect
                        searchId={'Reports'}
                        className="my-2"
                        options={this.state.reports}
                        search={true}
                        searchLabel="Поиск по отчетам"
                        getValue={this.setReport}
                        selected="Выберите отчет"
                        outline
                        id="reportsSelect"
                        name='reports'
                        required
                        label="Наименование отчета"/>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mb-3">
                    <MDBSelect
                        className="my-2"
                        options={this.state.formats}
                        getValue={this.setReportFormat}
                        search={true}
                        searchLabel="Поиск по форматам"
                        selected="Выберите формат"
                        outline
                        required
                        label="Формат отчета"
                    />
                  </MDBCol>
                </MDBRow>
                {this.state.report && (
                    <React.Fragment>
                      {this.state.report.type === 1 && (
                          <MDBRow>
                            <MDBCol md="12" className="mb-3">
                              <MDBSelect
                                  className="my-2"
                                  options={this.state.goalsSelectList}
                                  search={true}
                                  searchLabel="Поиск по целям"
                                  getValue={this.setGoal}
                                  selected="Выберите цель"
                                  outline
                                  required
                                  label="Наименование цели"
                              />
                            </MDBCol>
                          </MDBRow>
                      )}
                      {this.state.report.type === 1 && (
                          <MDBRow>
                            <MDBCol md="12" className="mb-3">
                              <MDBSelect
                                  className="my-2"
                                  options={this.state.scenariosSelectList}
                                  search={true}
                                  searchLabel="Поиск по сценариям"
                                  getValue={this.setScenario}
                                  selected="Выберите сценарий"
                                  outline
                                  required
                                  label="Наименование сценария"
                              />
                            </MDBCol>
                          </MDBRow>
                      )}
                      {this.state.report.type <= 2 && (
                          <MDBRow>
                            <MDBCol md="12" className="mb-3">
                              <MDBSelect
                                  className="my-2"
                                  options={this.state.quartersSelectList}
                                  search={true}
                                  searchLabel="Поиск по кварталам"
                                  getValue={this.setQuarter}
                                  selected="Выберите квартал"
                                  outline
                                  required
                                  label="Наименование квартала"
                              />
                            </MDBCol>
                          </MDBRow>
                      )}
                      {this.state.report.type >= 0 && (
                          <MDBRow>
                            <MDBCol>
                              <MDBInput label="Начальный год" value={this.state.start} type="number" name="start"
                                        outline
                                        id='startInput'
                                        onChange={this.onChangeHandler} required>
                                <div className='invalid-feedback'>
                                  Введите корректный начальный год
                                </div>
                              </MDBInput>
                            </MDBCol>
                          </MDBRow>
                      )}
                      {this.state.report.type === 4 && (
                          <MDBRow>
                            <MDBCol>
                              <MDBInput label="Конечный год" value={this.state.end} type="number" name="end"
                                        id='endInput'
                                        outline
                                        onChange={this.onChangeHandler} required>
                                <div className='invalid-feedback'>
                                  Введите корректный конечный год
                                </div>
                              </MDBInput>
                            </MDBCol>
                          </MDBRow>
                      )}
                      <MDBRow center middle between className="text-center">
                        {this.state.report.type === 4 || this.state.report.type === 5 && (
                            <MDBCol middle>
                              <MDBInput
                                  type="checkbox"
                                  value="conditions"
                                  id="checkInput"
                                  name='labeling'
                                  label="Подписи значений рядов данных"
                                  onClick={this.onChangeLabelHandler}>
                              </MDBInput>
                            </MDBCol>
                        )}
                        {this.state.report.type >= 0 && (
                            <MDBCol middle>
                              <MDBBtn color="primary" type="submit">
                                Скачать
                              </MDBBtn>
                            </MDBCol>
                        )}
                        {this.state.report.type >= 0 && (
                            <MDBCol middle>
                              {this.state.isDownloading && <MDBSpinner multicolor small={true}/>}
                            </MDBCol>
                        )}
                      </MDBRow>
                    </React.Fragment>
                )}
              </form>
          )}
        </MDBCol>
    );
  }
}

export default AnalystReportPage;
