import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportProjectsDetailUpdatePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: Number(this.props.location.state[10]),
            documentId: Number(this.props.location.state[8]),
            projectId: Number(this.props.location.state[9]),
            plan: Number(this.props.location.state[5]),
            spent: Number(this.props.location.state[6]),
            fact: Number(this.props.location.state[7]),
            year: Number(this.props.location.state[0]),
            isLoading: false
        };
    }

    /*
            @RequestParam("pID") Long pID,
            @RequestParam("pDoc") Long pDoc,
            @RequestParam("pPlan") BigDecimal pPlan,
            @RequestParam("pSpent") BigDecimal pSpent,
            @RequestParam("pFact") BigDecimal pFact){
    */

    doUpdate =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-7-details/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pSpent=${this.state.spent}&pFact=${this.state.fact}`)
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
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Обновление документа</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="#" value={this.state.id} disabled={true} type="number" name="id"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Предусмотрено на год" value={this.state.plan} onChange={this.onChangeHandler} type="number" name="plan"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Освоено на год" value={this.state.spent} onChange={this.onChangeHandler} type="number" name="spent"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Кассовые расходы за год" value={this.state.fact} onChange={this.onChangeHandler} type="number" name="fact"/>
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
