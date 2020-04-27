import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";

export default class OperatorPlanIndicatorsEditPage extends React.Component {

    state = {
        id: 0,
        transportStrategyCode: "",
        scenarioName: "",
        goalName: "",
        indicatorName: "",
        transportTypeName: "",
        indicatorDate: "",
        indicatorValueId: 0,
        okeiList: [],
        okeiId: 0,
        okeiName: "",
        value: 0.0,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state[0],
            transportStrategyCode: this.props.location.state[1],
            scenarioName: this.props.location.state[2],
            goalName: this.props.location.state[3],
            indicatorName: this.props.location.state[4],
            transportTypeName: this.props.location.state[5],
            indicatorDate: this.props.location.state[6],
            okeiId: this.props.location.state[7],
            okeiName: this.props.location.state[8],
            value: this.props.location.state[9],
            indicatorValueId: this.props.location.state[10],
            okeiList: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.getOkeiList(this.state.okeiId);
        console.log(this.state);
    };

    getOkeiList = (okeiId) => {
        this.setState({ isLoading: true });
        axios.get(`/api/nsi-okeis`)
            .then(res => {
                const data = res.data.map(item => {
                    if (item.id === okeiId){
                        return {value: item.id, text: item.name, checked: true};
                    }
                    else{
                        return {value: item.id, text: item.name, checked: false};
                    }
                });
                console.log(data);
                this.setState({okeiList: data, isLoading: false});
            });
    };

    setOkeiElement = event => {
        console.log(event);
        this.setState({okeiId: event.toString()})
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = () => {
        const responseData = {id: this.state.id, okeiId: this.state.okeiId, indicatorValueId: this.state.indicatorValueId, value: this.state.value};
        console.log(responseData);
        appAxios({
            url: `views/k-1-s`,
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
                        <MDBInput label="Редакция ТС" value={this.state.transportStrategyCode} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Вариант реализации стратегии" value={this.state.scenarioName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Цель" value={this.state.goalName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Индикатор" value={this.state.indicatorName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Вид транспорта" value={this.state.transportTypeName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Этап реализации стратегии" value={this.state.indicatorDate} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Значение индикатора" value={this.state.value} type="number" name="planingMin" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect label="Единица измерения"
                                   search={true}
                                   options={this.state.okeiList}
                                   getValue={this.setOkeiElement}>
                        </MDBSelect>
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
