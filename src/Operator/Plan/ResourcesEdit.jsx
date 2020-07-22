import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class OperatorPlanResourcesEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {

        super(props);
        console.log('Props in constructor =', props);

        this.state.id = props.data.id;
        this.state.transportStrategyCode = props.data.transportStrategyCode;
        this.state.scenarioName = props.data.scenarioName;
        this.state.costTypeCode = props.data.costTypeCode;
        this.state.directionName = props.data.directionName;
        this.state.fundingSourceName = props.data.fundingSourceName;
        this.state.stageName = props.data.stageName;
        this.state.planingMin = props.data.planingMin;
        this.state.planingMax = props.data.planingMax;

    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = (e) => {
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
            this.props.tableRef.current.onQueryChange();
        });
    };

    render() {
        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.state.id} type="number"/>
                    <MDBInput label="Редакция ТС" value={this.state.transportStrategyCode} type="textarea"/>
                    <MDBInput label="Вариант реализации стратегии" value={this.state.scenarioName} type="textarea"/>
                    <MDBInput label="Вид вложений" value={this.state.costTypeCode} type="textarea"/>
                    <MDBInput label="Направление вложений" value={this.state.directionName} type="textarea"/>
                    <MDBInput label="Источник финансирования" value={this.state.fundingSourceName} type="textarea"/>
                    <MDBInput label="Период реализации стратегии" value={this.state.stageName} type="textarea"/>
                    <MDBInput label="Минимальное ресурсное обеспечение, млрд. руб." value={this.state.planingMin}
                              type="number" name="planingMin" onChange={e => this.onChangeHandler(e)}/>
                    <MDBInput label="Максимальное ресурсное обеспечение, млрд. руб." value={this.state.planingMax}
                              name="planingMax" type="number" onChange={e => this.onChangeHandler(e)}/>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
