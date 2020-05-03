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
        axios.get(`/api/document-types?code.in=PROJECT_BUDGET_REPORT&code.in=TOTAL_BUDGET_REPORT&code.in=BUDGET_REPORT&code.in=ACTIVITY_REPORT&code.in=PROJECT_REPORT`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
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
            axios.get(`/api/documents?documentTypeId.equals=${typeId}`)
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
        axios.get(`/api/nsi-years`)
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
        axios.get(`/api/nsi-quarters`)
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

    doSave = () => {

        // const responseData = { code: this.state.code,
        //     name: this.state.name,
        //     description: this.state.description,
        //     beginDate: this.state.beginDate,
        //     endDate: this.state.endDate,
        //     documentDate: this.state.documentDate,
        //     documentTypeId: this.state.documentTypeId,
        //     yearId: this.state.yearId,
        //     quarterId: this.state.quarterId
        // };
        //
        // console.log(responseData);
        //
        // appAxios({
        //     url: `documents`,
        //     method: 'POST',
        //     data: responseData
        // }).then((response) => {
        //     const message = response.headers["x-mrts-backend-params"];
        //     toast.success(`Успешно создан документ с ID ${message}`, {
        //         closeButton: false
        //     });
        // }).catch(function (error) {
        //     console.log(error);
        //     toast.error(`Ошибка при создании документа`, {
        //         closeButton: false
        //     });
        // });

        toast.warning(`Функции не подключены`, {
            closeButton: false
        });

    };

    doCreateDocument = () => {
        history.push(`/admin/loading/document`);
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Инициализация бланков отчетов-исполнителей</h2>

                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <MDBSelect label="Версия ТС"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.transportStrategyList}
                                   getValue={this.setTransportStrategy}>
                        </MDBSelect>
                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <MDBSelect label="Квартал"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                        <MDBSelect label="Год"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.yearList}
                                   getValue={this.setYear}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Вид документа"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.documentTypeList}
                                   getValue={this.setDocumentType}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                {this.state.documentTypeSelected && (
                    <MDBRow middle={true}>
                        <MDBCol md="10" className="mb-3">
                            <MDBSelect label="Документ основание"
                                       search={true}
                                       searchLabel={'Поиск'}
                                       options={this.state.documentList}
                                       getValue={this.setDocument}>
                            </MDBSelect>
                        </MDBCol>
                        <MDBCol md="2" className="mb-3" middle={true}>
                            <MDBBtn color="primary" type="none" onClick={this.doCreateDocument}  className='py-3'>
                                Создать
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                )}

                <MDBRow center={true}>
                    <MDBBtn color="success" type="none" onClick={this.doSave}>
                        Инициализировать
                    </MDBBtn>
                </MDBRow>

            </MDBCol>
        );
    }
}
