import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import axios from "axios";
import moment from "moment";
import appAxios from "../../_services/appAxios";
import {history} from "@/_helpers";

export default class AdminLoadingReportsPage extends React.Component {

    state = {
        documentTypeId: 0,
        documentTypeList: [],
        yearId: 0,
        yearList:[],
        quarterId: 0,
        quarterList: [],
        transportStrategyId: 0,
        transportStrategyList: [],
        isLoading: false,
        documentTypeSelected: false,
        documentList: [],
        documentId: 0
    };

    componentDidMount() {
        this.getDocumentTypeList();
        this.getYearList();
        this.getQuarterList();
        this.getTransportStrategyList();
    };

    getTransportStrategyList = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/transport-strategy-versions`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.code};
                })
                this.setState({transportStrategyList: data, isLoading: false});
            });
    }

    setTransportStrategy = event => {
        this.setState({transportStrategyId: event.toString()});
    }

    getDocumentTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/document-types?code.in=PROJECT_BUDGET_REPORT&code.in=TOTAL_BUDGET_REPORT&code.in=BUDGET_REPORT&code.in=ACTIVITY_REPORT&code.in=PROJECT_REPORT`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name, code: item.code};
                })
                this.setState({documentTypeList: data, isLoading: false});
            })
    };

    setDocumentType = event => {
        const typeId = event.toString();
        this.getDocumentList(typeId);
    }

    getDocumentList = (typeId) => {
        console.log(`typeId is equals ${typeId}`);
        if (typeId > 0 && typeId !== undefined && typeId !== ""){
            this.setState({ isLoading: true });
            console.log(this.state);
            appAxios.get(`/documents?documentTypeId.equals=${typeId}`)
                .then(res => {
                    console.log(res.data);
                    const data = res.data.map(item => {
                        return {value: item.id, text: item.name};
                    })
                    this.setState({documentList: data, isLoading: false, documentTypeSelected: true, documentTypeId: typeId});
                });
        }
    }

    setDocument = event => {
        this.setState({documentId: event.toString()})
    }

    getYearList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-years`)
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
        appAxios.get(`/nsi-quarters`)
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

    doInit = () => {

        /*
K7_DETAIL - PROJECT_BUDGET_REPORT выполняем MTS_RES_PLAN_PKG.InitProjectRes
K8 - TOTAL_BUDGET_REPORT выполняем MTS_RES_PLAN_PKG.InitBudgetTotal
K9, K10 - BUDGET_REPORT выполняем MTS_RES_PLAN_PKG.InitBudgetByTransport
K6 - ACTIVITY_REPORT выполняем MTS_ACTIVITY_REPORT_PKG.InitPeriod
K7_MASTER - PROJECT_REPORT выполняем MTS_PROJECT_REPORT_PKG.PROJECT_REPORT InitPeriod
         */

        const documentTypeCode = this.state.documentTypeList.find(item => item.value === Number(this.state.documentTypeId)).code;
        let url;

        /*
K6
@RequestParam("pIDTsVer") Long pIDTsVer
@RequestParam("pDoc") Long pDoc)
K7Details
@RequestParam("pDoc") Long pID,
@RequestParam("pTSVer") Long pDoc)
K7Master
@RequestParam("pIDTsVer") Long pIDTsVer,
@RequestParam("pDocProject") Long pDocProject)
K8
@RequestParam("pDoc") Long pDoc,
@RequestParam("pTSVer") Long pTsVer)
K9
@RequestParam("pDoc") Long pDoc,
@RequestParam("pTsVer") Long pTsVer)
K10
@RequestParam("pDoc") Long pDoc,
@RequestParam("pTsVer") Long pTsVer)
*/

        switch (documentTypeCode) {
            case 'PROJECT_BUDGET_REPORT':
                url = `/views/k-7-details/init?pDoc=${this.state.documentId}&pTsVer=${this.state.transportStrategyId}`;
                break;
            case 'TOTAL_BUDGET_REPORT':
                url = `/views/k-8-s/init?pDoc=${this.state.documentId}&pTsVer=${this.state.transportStrategyId}`;
                break;
            case 'BUDGET_REPORT':
                url = `/views/k-9-s/init?pDoc=${this.state.documentId}&pTsVer=${this.state.transportStrategyId}`;
                break;
            case 'ACTIVITY_REPORT':
                url = `/views/k-6-s/init?pTsVer=${this.state.transportStrategyId}&pDoc=${this.state.documentId}`;
                break;
            case 'PROJECT_REPORT':
                url = `/views/k-7-masters/init?pTsVer=${this.state.transportStrategyId}&pDocProject=${this.state.documentId}`;
                break;
            default:
                url = null;
        }

        this.setState({ isLoading: true });
        appAxios.get(`${url}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешно инициализировали отчет`, {
                    closeButton: false
                });

            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при инициализации отчета`, {
                closeButton: false
            });
        });
    };

    doCreateDocument = () => {
        history.push(`/admin/loading/document`, {documentTypeId: this.state.documentTypeId, yearId: this.state.yearId, quarterId: this.state.quarterId});
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Инициализация бланков отчетов-исполнителей</h2>

                <MDBRow>
                    <MDBCol md="4" className="mb-3">

                        <form>
                            <MDBSelect
                                search={true}
                                options={this.state.transportStrategyList}
                                searchLabel={'Поиск'}
                                outline
                                label='Версия ТС'
                                getValue={this.setTransportStrategy}
                            />
                        </form>

                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <form>
                            <MDBSelect label="Квартал"
                                       search={true}
                                       searchLabel={'Поиск'}
                                       outline
                                       options={this.state.quarterList}
                                       getValue={this.setQuarter}>
                            </MDBSelect>
                        </form>
                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <form>
                            <MDBSelect label="Год"
                                       search={true}
                                       searchLabel={'Поиск'}
                                       outline
                                       options={this.state.yearList}
                                       getValue={this.setYear}>
                            </MDBSelect>
                        </form>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <form>
                            <MDBSelect label="Вид документа"
                                       search={true}
                                       searchLabel={'Поиск'}
                                       outline
                                       options={this.state.documentTypeList}
                                       getValue={this.setDocumentType}>
                            </MDBSelect>
                        </form>
                    </MDBCol>
                </MDBRow>

                {this.state.documentTypeSelected && (
                    <MDBRow middle={true}>
                        <MDBCol md="10" className="mb-3">
                            <form>
                                <MDBSelect label="Документ основание"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           outline
                                           options={this.state.documentList}
                                           getValue={this.setDocument}>
                                </MDBSelect>
                            </form>
                        </MDBCol>

                        <MDBCol md="2" className="mb-3" middle={true}>
                            <MDBBtn color="primary" type="none" onClick={this.doCreateDocument}  className='py-3'>
                                Создать
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                )}

                <MDBRow center={true}>
                    <MDBBtn color="success" type="none" onClick={this.doInit}>
                        Инициализировать
                    </MDBBtn>
                </MDBRow>

            </MDBCol>
        );
    }
}
