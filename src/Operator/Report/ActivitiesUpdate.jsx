import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportActivitiesUpdatePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: Number(this.props.location.state[0]),
            documentId: Number(this.props.location.state[8]),
            activityId: this.props.location.state[9],
            activityReportID: this.props.location.state[10],
            activityName: this.props.location.state[2],
            description: this.props.location.state[7],
            isLoading: false
        };
    }

/*
@RequestParam("pID") Long pID,
@RequestParam("pDoc") Long pDoc,
@RequestParam("pRptDescription") String pRptDescription){
*/

    doUpdate =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-6-s/update?pID=${this.state.activityReportID}&pDoc=${this.state.documentId}&pRptDescription=${this.state.description}`)
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
                        <MDBInput label="Наименование мероприятия" value={this.state.activityName} disabled={true} type="textarea" rows="2" name="activityName"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput type="textarea" value={this.state.description}  label="Отчет исполнителя" rows="5" onChange={this.onChangeHandler} name='description'/>
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
