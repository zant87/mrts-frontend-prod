import React from "react";
import {MDBBtn, MDBContainer, MDBInput, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";

export default class OperatorReportFactEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {
        super(props);
        console.log('Props in constructor =', props);

        this.state = {
            id: props.data.id,
            dataProviderName: props.data.dataProviderName,
            transportTypeName: props.data.transportTypeName,
            formCode: props.data.formCode,
            parameterName: props.data.parameterName,
            year: props.data.year,
            quarterName: props.data.quarterName,
            okeiName: props.data.okeiName,
            value: props.data.value,
            initialized: true,
        };
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doSave = (e) => {
        const responseData = {id: this.state.id, value: this.state.value};
        appAxios({
            url: `views/k-5-s`,
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
                    <MDBInput label="#" value={this.state.id} disabled={true} type="number"/>
                    <MDBInput label="Источник данных" value={this.state.dataProviderName} disabled={true} type="text"/>
                    <MDBInput label="Вид транспорта" value={this.state.transportTypeName} disabled={true} type="text"/>
                    <MDBInput label="Форма" value={this.state.formCode} disabled={true} type="text"/>
                    <MDBInput label="Показатель" value={this.state.parameterName} disabled={true} type="text"/>
                    <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="text"/>
                    <MDBInput label="Отчетный квартал" value={this.state.quarterName} disabled={true} type="text"/>
                    <MDBInput label="Единица измерения" value={this.state.okeiName} disabled={true} type="text"/>
                    <MDBInput label="Значение показателя" value={this.state.value} type="number" name="value"
                              onChange={e => this.onChangeHandler(e)}/>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
