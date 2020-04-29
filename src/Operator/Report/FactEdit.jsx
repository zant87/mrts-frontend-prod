import React from "react";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";

export default class OperatorReportFactEditPage extends React.Component {

    state = {
        id: 0,
        dataProviderName: "",
        transportTypeName: "",
        formCode: "",
        parameterName: "",
        year: 0,
        indicatorValueId: 0,
        quarterName: "",
        okeiName: "",
        value: "",
        isLoading: false
    };

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            id: this.props.location.state[0],
            dataProviderName: this.props.location.state[1],
            transportTypeName: this.props.location.state[2],
            formCode: this.props.location.state[3],
            parameterName: this.props.location.state[4],
            year: this.props.location.state[5],
            quarterName: this.props.location.state[6],
            okeiName: this.props.location.state[7],
            value: this.props.location.state[8],
            isLoading: false
        };
    }

    componentDidMount() {
        console.log(this.state);
    };

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = () => {
        const responseData = {id: this.state.id, value: this.state.value};
        console.log(responseData);
        appAxios({
            url: `views/k-5-s`,
            method: 'PUT',
            data: responseData
        }).then((response) => {
            console.log(response.headers["x-mrts-backend-alert"]);
        });
    };

    doBack = () => {
        history.back();
    };

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>
                <h2 className='text-center my-2'>Редактирование индикатора ТС по цели и задаче (план)</h2>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="#" value={this.state.id} disabled={true} type="number"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Источник данных" value={this.state.dataProviderName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Вид транспорта" value={this.state.transportTypeName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Форма" value={this.state.formCode} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Показатель" value={this.state.parameterName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Отчетный квартал" value={this.state.quarterName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Единица измерения" value={this.state.okeiName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Значение показателя" value={this.state.value} type="number" name="value" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBBtn color="primary" type="none" onClick={this.doSave}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="info" type="none" onClick={this.doBack}>
                        Назад
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        );
    }
}
