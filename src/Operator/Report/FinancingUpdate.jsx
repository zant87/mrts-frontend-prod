import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportFinancingUpdatePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: Number(this.props.location.state[4]),
            documentId: Number(this.props.location.state[5]),
            plan: Number(this.props.location.state[2]),
            fact: Number(this.props.location.state[3]),
            year: Number(this.props.location.state[0]),
            expenditureName: this.props.location.state[1],
            isLoading: false
        };
    }

    /*
            @RequestParam("pID") Long pID,
            @RequestParam("pDoc") Long pDoc,
            @RequestParam("pPlan") BigDecimal pPlan,
            @RequestParam("pFact") BigDecimal pFact)
    */

    doUpdate =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-8-s/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pFact=${this.state.fact}`)
            .then(res => {
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Обновили данные документа №${data}`, {
                    closeButton: false
                });
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

    doBack = () => {
        history.back();
    };

    render() {
        return(
            <MDBCol md='8' className='mx-auto my-3'>

                <h2 className='text-center my-2'>Обновление документа</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="#" value={this.state.id} disabled={true} type="number" name="id"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Направление расходов" value={this.state.expenditureName} disabled={true} type="text" name="expenditureName"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="number" name="year"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Запланировано, млн. руб." value={this.state.plan} onChange={this.onChangeHandler} type="number" name="plan"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Кассовое исполнение, млн. руб." value={this.state.fact} onChange={this.onChangeHandler} type="number" name="fact"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBBtn color="primary" type="none" onClick={this.doUpdate}>
                        Обновить
                    </MDBBtn>
                    <MDBBtn color="info" type="none" onClick={this.doBack}>
                        Назад
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        )
    }

}
