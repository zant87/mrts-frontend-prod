import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class OperatorPlanResourcesEditPage extends React.Component {

    state = {
        id: 0,
        transportStrategyCode: "",
        scenarioName: "",
        costTypeCode: "",
        directionName: "",
        fundingSourceName: "",
        stageName: "",
        planingMin: 0.0,
        planingMax: 0.0,
        isLoading: false
    };

    componentDidMount() {
        this.setState(
            {
                id: this.props.location.state[0],
                transportStrategyCode: this.props.location.state[1],
                scenarioName: this.props.location.state[2],
                costTypeCode: this.props.location.state[3],
                directionName: this.props.location.state[4],
                fundingSourceName: this.props.location.state[5],
                stageName: this.props.location.state[6],
                planingMin: this.props.location.state[7],
                planingMax: this.props.location.state[8],
            }
        );
    };

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = () => {
        const responseData = {id: this.state.id, planingMax: this.state.planingMax, planingMin: this.state.planingMin};
        appAxios({
            url: `views/k-4-s`,
            method: 'PUT',
            data: responseData
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно обновлена запись с ID ${message}`, {
                closeButton: false
            });
        });
    };

    doBack = () => {
        history.back();
    };

    render() {
        return (
            <MDBCol md='8' className='mx-auto my-5'>
                <h2 className='text-center my-2'>Редактирование ресурсного обеспечения ТС (план)</h2>
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
                        <MDBInput label="Вид вложений" value={this.state.costTypeCode} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Направление вложений" value={this.state.directionName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Источник финансирования" value={this.state.fundingSourceName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Период реализации стратегии" value={this.state.stageName} disabled={true} type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Минимальное ресурсное обеспечение, млрд. руб." value={this.state.planingMin} type="number" name="planingMin" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Максимальное ресурсное обеспечение, млрд. руб." value={this.state.planingMax} name="planingMax" type="number" onChange={this.onChangeHandler}/>
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
