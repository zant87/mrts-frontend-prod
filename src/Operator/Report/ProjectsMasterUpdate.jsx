import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportProjectsMasterUpdatePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: Number(this.props.location.state[12]),
            documentId: Number(this.props.location.state[10]),
            projectId: Number(this.props.location.state[11]),
            factStarted: Number(this.props.location.state[5]),
            factFinished: Number(this.props.location.state[6]),
            done: Number(this.props.location.state[3]),
            description: this.props.location.state[9],
            projectName: this.props.location.state[2],
            year: Number(this.props.location.state[0]),
            isLoading: false
        };
    }

/*
            @RequestParam("pID") Long pID,
            @RequestParam("pDoc") Long pDoc,
            @RequestParam("pIdProject") Long pIdProject,
            @RequestParam("pFactStarted") Long pFactStarted,
            @RequestParam("pFactFinished") Long pFactFinished,
            @RequestParam("pDone") BigDecimal pDone,
            @RequestParam("pRptDescription") String pRptDescription)
*/

    doUpdate =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-7-masters/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pIdProject=${this.state.projectId}&pFactStarted=${this.state.factStarted}&pFactFinished=${this.state.factFinished}&pDone=${this.state.done}&pRptDescription=${this.state.description}`)
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
                        <MDBInput label="Содержание проекта" value={this.state.projectName} disabled={true} type="textarea" rows="2" name="projectName"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="number" name="year"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Уровень технической готовности" value={this.state.done} onChange={this.onChangeHandler} type="number" name="done"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Начало фактической реализации" value={this.state.factStarted} onChange={this.onChangeHandler} type="number" name="factStarted"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Конец фактической реализации" value={this.state.factFinished} onChange={this.onChangeHandler} type="number" name="factFinished"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput type="textarea" label="Фактические результаты за отчетный период" value={this.state.description}  rows="5" onChange={this.onChangeHandler} name='description'/>
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
