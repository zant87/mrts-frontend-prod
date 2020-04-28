import React from 'react';
import {MDBBtn, MDBCol, MDBRow, MDBSelect} from "mdbreact";
import actions from "./ReportsActions";
import selectors from "./ReportsSelectors";
import {connect} from 'react-redux';
import appAxios from "../../_services/appAxios";

class AnalystReportPage extends React.Component {

    state = {
        rows: null,
        selectedRow: null,
        reportSelected: false,
        reportType: 0,
        start: 2015,
        end: 2020,
        reportFormat: 'PDF',
        reportCode: 'M13',
        reportLabel: false,
        options: [
            {
                text: "PDF",
                value: "PDF"
            },
            {
                text: "XLSX",
                value: "XLSX"
            },
            {
                text: "DOCX",
                value: "DOCX"
            }
        ]
    };

    setReportFormat = event => {
        this.setState({ reportFormat: event.toString() })
    }

    setReportCode = event => {
        console.log(event.toString());
        this.state.reportCode = event.toString();
        this.state.selectedRow = this.props.rows.filter(element => element.value === this.state.reportCode)[0];
        if (this.state.selectedRow) {
            this.state.reportSelected = true;
            this.state.reportType = this.state.selectedRow.type;

            console.log(this.state.selectedRow);
            console.log(this.state.reportSelected);
            console.log(this.state.reportType);

            this.setState(this.state);
        }
    }

    doDownload = () => {
        if (this.state.reportFormat && this.state.reportCode)
        {
            appAxios({
                url: `reports/${this.state.reportCode}/download?format=${this.state.reportFormat}&start=${this.state.start}&end=${this.state.end}&label=${this.state.reportLabel}`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',
                    `report_${this.state.reportCode}-${this.state.start}-${this.state.end}.${this.state.reportFormat}`);
                document.body.appendChild(link);
                link.click();
            });
        }
        else
        {
            console.log('Значение reportFormat и reportCode отсутствуют')
        }
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    };

    changeLabelHandler = event => {
        this.state.reportLabel = !this.state.reportLabel;
        this.setState(this.state);
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.doFetch());
    };

    render() {

        const {
            rows,
        } = this.props;

        return (
            <MDBCol md='8' className='mx-auto my-5'>
                <h1 className='text-center my-2'>Материалы доклада о реализации транспортной стратегии Российской Федерации</h1>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect className='my-2'
                                   options={rows}
                                   search={true}
                                   searchLabel='Поиск по отчетам'
                                   getValue={this.setReportCode}
                                   selected='Выберите отчет'
                                   label='Наименование отчета'/>
                    </MDBCol>
                </MDBRow>
                {this.state.reportSelected && (
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect className='my-2'
                                   options={this.state.options}
                                   getValue={this.setReportFormat}
                                   selected='Выберите формат'
                                   label='Формат отчета'/>
                    </MDBCol>
                </MDBRow>
                )}
                {(this.state.reportSelected) && (
                    <MDBRow>
                        <MDBCol className="mb-3">
                            <label htmlFor="defaultFormRegisterEmailEx2"
                                   className="grey-text">
                                Начальный год</label>
                            <input
                                value={this.state.start}
                                name="start"
                                onChange={this.changeHandler}
                                type="number"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Начальный год"
                            />
                        </MDBCol>
                    </MDBRow>
                )}
                {(this.state.reportSelected && this.state.reportType === 1) && (
                    <MDBRow>
                        <MDBCol className="mb-3">
                            <label htmlFor="defaultFormRegisterConfirmEx3"
                                   className="grey-text">
                                Конечный год</label>
                            <input
                                value={this.state.end}
                                onChange={this.changeHandler}
                                type="number"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="end"
                                placeholder="Конечный год"
                            />
                        </MDBCol>
                    </MDBRow>
                )}
                {(this.state.reportSelected && this.state.reportType > 0) && (
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <div className="custom-control custom-checkbox pl-3">
                                <input
                                    className="custom-control-input"
                                    type="checkbox"
                                    name="reportLabel"
                                    id="invalidCheck"
                                    required
                                    onClick={this.changeLabelHandler}
                                />
                                <label className="custom-control-label" htmlFor="invalidCheck">
                                    Подписи значений рядов данных
                                </label>
                            </div>
                        </MDBCol>
                    </MDBRow>
                )}
                <MDBBtn color="primary" type="none" onClick={this.doDownload} disabled={!this.state.reportSelected}>
                    Загрузить
                </MDBBtn>
            </MDBCol>
        )
    }
}

function select(state) {
    return {
        rows: selectors.selectRows(state),
    };
}

export default connect(select) (AnalystReportPage);
