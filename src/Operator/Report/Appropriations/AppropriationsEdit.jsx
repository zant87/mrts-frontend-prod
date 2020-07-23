import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportAppropriationsUpdatePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.data;
    }

    doSave = (e) => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-9-s/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pFact=${this.state.fact}`)
            .then(res => {
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Обновили данные документа №${data}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при обновлении документа`, {
                closeButton: false
            });
        });
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {
        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>

                    <MDBInput label="#" value={this.state.id} disabled={true} type="number" name="id"/>
                    <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="text" name="year"/>
                    <MDBInput label="Направление расходов" value={this.state.directionName} disabled={true} type="text"
                              name="directionName"/>
                    <MDBInput label="Источник финансирования" value={this.state.fundingName} disabled={true} type="text"
                              name="fundingName"/>
                    <MDBInput label="Вид расходов" value={this.state.costTypeName} disabled={true} type="text"
                              name="costTypeName"/>
                    <MDBInput label="Запланировано, млн. руб." value={this.state.plan}
                              onChange={e => this.onChangeHandler(e)} type="number" name="plan"/>
                    <MDBInput label="Кассовое исполнение, млн. руб." value={this.state.fact}
                              onChange={e => this.onChangeHandler(e)} type="number" name="fact"/>

                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Обновить
                    </MDBBtn>

                </div>
            </MDBContainer>

        )
    }

}
