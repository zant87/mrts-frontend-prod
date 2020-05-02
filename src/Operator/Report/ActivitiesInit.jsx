import React from "react";
import {MDBBtn, MDBCol, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import 'moment/locale/ru';

export default class OperatorReportActivitiesInitPage extends React.Component {

    state = {
        docList: [],
        docId: 0,
        transportStrategyList: [],
        transportStrategyId: 0,
        isLoading: false,
        result: 0
    };

    componentDidMount() {
        this.getTransportStrategyList();
        this.getDocList();
    };

    getDocList = () => {
        this.setState({isLoading: true});
        axios.get(`/api/documents`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
                })
                this.setState({docList: data, isLoading: false});
            });
    }

    setDoc = event => {
        this.setState({docId: event.toString()});
    }

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

    doInit =() => {
        this.setState({ isLoading: true });
        axios.get(`/api/views/k-6-s/init?pIDTsVer=${this.state.transportStrategyId}&pDoc=${this.state.docId}`)
            .then(res => {
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешно инициализировали отчеты`, {
                    closeButton: false
                });
            });
    }

    doBack = () => {
        history.back();
    };

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Инициализировать отчеты исполнителей по мероприятиям</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Транспортная стратегия"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.transportStrategyList}
                                   getValue={this.setTransportStrategy}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Документ"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.docList}
                                   getValue={this.setDoc}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBBtn color="primary" type="none" onClick={this.doInit}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="info" type="none" onClick={this.doBack}>
                        Назад
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        )
    }
}
