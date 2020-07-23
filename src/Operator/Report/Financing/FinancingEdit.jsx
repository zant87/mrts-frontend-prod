import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import 'moment/locale/ru';

export default class OperatorReportFinancingEditPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.data;
    }

    doSave = (e) => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-8-s/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pFact=${this.state.fact}`)
            .then(res => {
                const data = res.data;
                toast.success(`Обновили данные документа №${data}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
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

    render() {
        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.state.id} type="number" name="id"/>
                    <MDBInput label="Направление расходов" value={this.state.expenditureName} type="text"
                              name="expenditureName"/>
                    <MDBInput label="Отчетный год" value={this.state.year} type="number" name="year"/>
                    <MDBInput label="Запланировано, млн. руб." value={this.state.plan}
                              onChange={e => this.onChangeHandler(e)} type="number" name="plan"/>
                    <MDBInput label="Кассовое исполнение, млн. руб." value={this.state.fact}
                              onChange={e => this.onChangeHandler(e)} type="number" name="fact"/>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Обновить
                    </MDBBtn>
                </div>
            </MDBContainer>
        )
    }
}
