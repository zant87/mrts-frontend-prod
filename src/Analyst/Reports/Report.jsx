import React, {Fragment} from "react";
import {MDBBtn, MDBCol, MDBRow, MDBSpinner, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from 'axios';
import {reportsList} from "./ReportsList";
import SelectInput from "../../_components/Inputs/SelectInput";
import {formatsList} from "./FormatsList";
import Preloader from "../../Common/Preloader/Preloader";
import Report1 from "./ReportTypes/Report1";

class AnalystReportPage extends React.Component {

  state = {
    isDownloading: false,
    labeling: false,
    start: 2018,
    end: 2020,
    initialized: false,
    goal: null,
    goals: {},
    scenario: null,
    scenarios: {},
    quarter: null,
    quarters: {},
    report: null,
    reports: reportsList,
    strategy: null,
    strategies: {},
    stage: null,
    stages: {},
    reportFormat: 'PDF'
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Reports.jsx getSnapshotBeforeUpdate', prevProps, prevState);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('Reports.jsx shouldComponentUpdate', nextProps, nextState);
    return this.state !== nextState;
  }

  getGoals = () => appAxios.get(`/goals?transportStrategyVersionActual.equals=true`).catch(err => console.log(err));
  getScenarios = () => appAxios.get(`/scenarios`).catch(err => console.log(err));
  getQuarters = () => appAxios.get(`/nsi-quarters`).catch(err => console.log(err));
  getStrategies = () => appAxios.get(`/transport-strategy-versions`).catch(err => console.log(err));
  getStages = () => appAxios.get('/nsi-stages').catch(err => console.log(err));

  async componentDidMount() {
    try {

      const [goalsData, scenariosData, quartersData, strategiesData, stageData] = await axios.all(
          [this.getGoals(), this.getScenarios(),
            this.getQuarters(), this.getStrategies(),
            this.getStages()]);

      this.setState(
          {
            goals: goalsData.data,
            scenarios: scenariosData.data,
            strategies: strategiesData.data,
            quarters: quartersData.data,
            stages: stageData.data,
            reports: reportsList,
            initialized: true,
          }
      );

    } catch (err) {
      console.log(err.message);
      toast.error(`Ошибка при инициализации`, {
        closeButton: false
      });
    }
  }

  setStage = (event) => {
    console.log('[Report.jsx] calling setStage...');
    if (event) {
      const filter = this.state.stages.filter((item) => item.code === event.toString())[0];
      console.log('[Report.jsx] setting Stage =', filter);
      this.setState({stage: filter});
    }
  }

  setStrategy = (event) => {
    console.log('[Report.jsx] calling setQuarter...');
    if (event) {
      const filter = this.state.strategies.filter((item) => item.code === event.toString())[0];
      console.log('[Report.jsx] setting Strategy =', filter);
      this.setState({strategy: filter});
    }
  }

  setQuarter = (event) => {
    console.log('[Report.jsx] calling setQuarter...');
    if (event) {
      const filter = this.state.quarters.filter((item) => item.code === event.toString())[0];
      console.log('[Report.jsx] setting Quarter =', filter);
      this.setState({quarter: filter});
    }
  }

  setScenario = (event) => {
    console.log('[Report.jsx] calling setScenario...');
    if (event) {
      const filter = this.state.scenarios.filter((item) => item.code === event.toString())[0];
      console.log('[Report.jsx] setting Scenario =', filter);
      this.setState({scenario: filter});
    }
  }

  setGoal = (event) => {
    console.log('[Report.jsx] calling setGoal...');
    if (event) {
      const filter = this.state.goals.filter((item) => item.name === event.toString())[0];
      console.log('[Report.jsx] setting Goal =', filter);
      this.setState({goal: filter});
    }
  }

  setReportFormat = (event) => {
    console.log(event);
    const filter = event.toString();
    if (filter) {
      console.log('Report Format = ', filter);
      this.setState({reportFormat: filter});
    } else {
      this.setState({reportFormat: null});
    }
  };

  setReport = (event) => {
    console.log(event);
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
    const reportType = Number(this.state.report.type);

    switch (reportType) {
      case 1:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&goal_code=${this.state.goal.name}&quarter_code=${this.state.quarter.code}&scenario_code=${this.state.scenario.name}`;
        reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.goal.name}_${this.state.quarter.code}_${this.state.scenario.name}.${this.state.reportFormat}`;
        break;
      case 2:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&quarter_code=${this.state.quarter.code}`;
        reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.quarter.code}.${this.state.reportFormat}`;
        break;
      case 3:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}`;
        reportName = `report_${this.state.report.value}_${this.state.start}.${this.state.reportFormat}`;
        break;
      case 4:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&start=${this.state.start}&end=${this.state.end}&label=${this.state.labeling}`;
        reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.end}.${this.state.reportFormat}`;
        break;
      case 5:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&label=${this.state.labeling}`;
        reportName = `report_${this.state.report.value}_${this.state.start}.${this.state.reportFormat}`;
        break;
      case 6:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}&year=${this.state.start}&scenario=${this.state.scenario.id}&ts=${this.state.strategy.id}`;
        reportName = `report_${this.state.report.value}_${this.state.start}_${this.state.scenario.code}_${this.state.strategy.code}.${this.state.reportFormat}`;
        break;
      default:
        reportUrl = `reports/${this.state.report.value}/download?format=${this.state.reportFormat}`;
        reportName = `report_${this.state.report.value}.${this.state.reportFormat}`;
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
    console.log(event);
    this.setState({[event.target.name]: event.target.value});
  };

  onChangeLabelingHandler = (event) => {
    console.log(event);
    this.setState({labeling: !this.state.labeling});
  }

  onSubmitHandler = async event => {
    event.preventDefault();
    event.target.className = "needs-validation was-validated"
    console.log(this.state);
    this.setState({isDownloading: true});
    await this.doDownload();
  };

  render() {

    let reportPicker = <MDBRow between><MDBSpinner multicolor small={true}/></MDBRow>;
    let report = null;

    if (this.state.initialized) {
      reportPicker =
          <Fragment>
            <MDBRow>
              <MDBCol md="12" className="mb-5">
                <SelectInput getValue={this.setReport}
                             options={this.state.reports}
                             selected="Выберите отчет"
                             label="Наименование отчета"
                             searchLabel="Поиск по отчетам"/>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12" className="mb-3">
                <SelectInput options={formatsList}
                             getValue={this.setReportFormat}
                             searchLabel="Поиск по форматам"
                             selected="Выберите формат"
                             label="Формат отчета"/>
              </MDBCol>
            </MDBRow>
          </Fragment>
    }

    if (this.state.initialized && this.state.report) {
      switch (this.state.report.type) {
        case 1:
          report =
              <form className="needs-validation" onSubmit={this.onSubmitHandler}>
                <Report1 goals={this.state.goals}
                         start={this.state.start}
                         scenarios={this.state.scenarios}
                         quarters={this.state.quarters}
                         onChange={(event) => this.onChangeHandler(event)}
                         setQuarter={(event) => this.setQuarter(event)}
                         setScenario={(event) => this.setScenario(event)}
                         setGoal={(event) => this.setGoal(event)}/>
              </form>
          break;
        default:
          report = <Preloader/>
      }
    }

    return (
        <MDBCol md="8" className="mx-auto my-5">
          <h1 className="text-center my-3">Материалы доклада о реализации транспортной стратегии Российской
            Федерации</h1>
          {reportPicker}
          {report}
        </MDBCol>
    )
  }
}

export default AnalystReportPage;
