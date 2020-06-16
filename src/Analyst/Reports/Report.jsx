import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, MDBSpinner, toast} from "mdbreact";
import actions from "./ReportsActions";
import selectors from "./ReportsSelectors";
import { connect } from "react-redux";
import appAxios from "../../_services/appAxios";

class AnalystReportPage extends React.Component {
  state = {
    rows: null,
    selectedRow: null,
    reportSelected: false,
    reportType: 0,
    start: 2015,
    end: 2020,
    reportFormat: "PDF",
    reportCode: "M13",
    reportLabel: false,
    options: [
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
    isLoading: false,
  };

  setReportFormat = (event) => {
    this.setState({ reportFormat: event.toString() });
  };

  setReportCode = (event) => {
    console.log(event.toString());
    this.state.reportCode = event.toString();
    this.state.selectedRow = this.props.rows.filter((element) => element.value === this.state.reportCode)[0];
    if (this.state.selectedRow) {
      this.state.reportSelected = true;
      this.state.reportType = this.state.selectedRow.type;

      console.log(this.state.selectedRow);
      console.log(this.state.reportSelected);
      console.log(this.state.reportType);

      this.setState(this.state);
    }
  };

  doDownload = async () => {
    try {
      this.setState({ isLoading: true });

      let response = await appAxios({
        url: `reports/${this.state.reportCode}/download?format=${this.state.reportFormat}&start=${this.state.start}&end=${this.state.end}&label=${this.state.reportLabel}`,
        method: "GET",
        responseType: "blob",
      });

      let url = window.URL.createObjectURL(new Blob([response.data]));
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${this.state.reportCode}-${this.state.start}-${this.state.end}.${this.state.reportFormat}`);
      document.body.appendChild(link);
      link.click();

      this.setState({ isLoading: false });
    } catch (e) {
      console.log(e);
      toast.error(`Ошибка при построении отчета ${this.state.reportCode}`);
      this.setState({ isLoading: false });
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  changeLabelHandler = (event) => {
    this.state.reportLabel = !this.state.reportLabel;
    this.setState(this.state);
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch());
  }

  render() {
    const { rows } = this.props;

    return (
        <MDBCol md="8" className="mx-auto my-5">
          <h1 className="text-center my-2">Материалы доклада о реализации транспортной стратегии Российской
            Федерации</h1>
          <MDBRow>
            <MDBCol md="12" className="mb-3">
              <MDBSelect
                  className="my-2"
                  options={rows}
                  search={true}
                  searchLabel="Поиск по отчетам"
                  getValue={this.setReportCode}
                  selected="Выберите отчет"
                  outline
                  label="Наименование отчета"
              />
            </MDBCol>
          </MDBRow>
          {this.state.reportSelected && (
              <MDBRow>
                <MDBCol md="12" className="mb-3">
                  <MDBSelect
                      className="my-2"
                      options={this.state.options}
                      getValue={this.setReportFormat}
                      selected="Выберите формат"
                      outline
                      label="Формат отчета"
                  />
                </MDBCol>
              </MDBRow>
          )}
          {this.state.reportSelected && (
              <MDBRow>
                <MDBCol className="mb-3">
                  <MDBInput label="Начальный год" value={this.state.start} type="number" name="start" outline
                            onChange={this.changeHandler}/>
                </MDBCol>
              </MDBRow>
          )}
          {this.state.reportSelected && this.state.reportType === 1 && (
              <MDBRow>
                <MDBCol className="mb-3">
                  <MDBInput label="Конечный год" value={this.state.end} type="number" name="end" outline
                            onChange={this.changeHandler}/>
                </MDBCol>
              </MDBRow>
          )}
          {this.state.reportSelected && this.state.reportType > 0 && (
              <MDBRow>
                <MDBCol md="4" className="mb-3">
                  <MDBInput
                      type="checkbox"
                      value="conditions"
                      id="invalidCheck"
                      required
                      name='reportLabel'
                      label="Подписи значений рядов данных"
                      onClick={this.changeLabelHandler}/>
                </MDBCol>
                <MDBCol middle={true}>{this.state.isLoading && <MDBSpinner multicolor small={true}/>}</MDBCol>
                <MDBCol middle={true}>
                  <MDBBtn color="primary" type="none" onClick={this.doDownload} disabled={!this.state.reportSelected}>
                    Загрузить
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
          )}
        </MDBCol>
    );
  }
}

function select(state) {
  return {
    rows: selectors.selectRows(state),
  };
}

export default connect(select)(AnalystReportPage);
