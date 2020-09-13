import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";

export default class OperatorPlanIndicatorsEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {

        super(props);
        console.log('Props in constructor =', props);

        this.state.okeis = props.okeis.map(item => {
                if (item.id === props.data.okeiId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.id = props.data.id;
        this.state.transportStrategyCode = props.data.transportStrategyCode;
        this.state.scenarioName = props.data.scenarioName;
        this.state.goalName = props.data.goalName;
        this.state.indicatorName = props.data.indicatorName;
        this.state.transportTypeName = props.data.transportTypeName;
        this.state.indicatorDate = props.data.indicatorDate;
        this.state.okeiId = props.data.okeiId;
        this.state.value = props.data.value;
        this.state.indicatorValueId = props.data.indicatorValueId;
    }

    setOkei = event => {
        console.log(event);
        this.setState({okeiId: event.toString()})
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = (e, close) => {
        const responseData = {
            id: this.state.id,
            okeiId: this.state.okeiId,
            indicatorValueId: this.state.indicatorValueId,
            value: this.state.value
        };
        console.log(responseData);
        appAxios({
            url: `views/k-1-s`,
            method: 'PUT',
            data: responseData
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно обновлена запись с ID ${message}`, {
                closeButton: false
            });
            this.props.tableRef.current.onQueryChange();
            if (close) {
                this.props.toggleModal();
            }
        });
    };

    render() {

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>

                    <MDBInput label="#" value={this.state.id} disabled={true} type="number"/>
                    <MDBInput label="Редакция ТС" value={this.state.transportStrategyCode} type="textarea"/>
                    <MDBInput label="Вариант реализации стратегии" value={this.state.scenarioName} type="textarea"/>
                    <MDBInput label="Цель" value={this.state.goalName} type="textarea"/>
                    <MDBInput label="Индикатор" value={this.state.indicatorName} type="textarea"/>
                    <MDBInput label="Вид транспорта" value={this.state.transportTypeName} type="textarea"/>
                    <MDBInput label="Этап реализации стратегии" value={this.state.indicatorDate} type="textarea"/>
                    <MDBInput label="Значение индикатора" value={this.state.value} type="number" name="value"
                              onChange={e => this.onChangeHandler(e)}/>
                    <MDBSelect label="Единица измерения"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.okeis}
                               getValue={e => this.setOkei(e)}>
                    </MDBSelect>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e, true)}>
                        Сохранить и закрыть
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
