import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import "../../../scrollbar.css";

export default class OperatorReportExtraBudgetEditPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.data;
    }

    doSave = (e) => {
        appAxios.get(`/views/k-10-s/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pFact=${this.state.fact}`)
            .then(res => {
                const data = res.data;
                this.setState({result: data, isLoading: false});
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
                    <MDBInput label="Отчетный год" value={this.state.year} type="number" name="year"/>
                    <MDBInput label="Направление расходов" value={this.state.directionName} type="text"
                              name="directionName"/>
                    <MDBInput label="Вид расходов" value={this.state.costTypeName} disabled={true} type="text"
                              name="directionName"/>
                    <MDBInput label="Фактические объемы исполнения, млн. руб." value={this.state.fact}
                              onChange={e => this.onChangeHandler(e)}
                              type="number" name="fact"/>
                    <MDBInput label="Плановые объемы исполнения, млн. руб." value={this.state.plan}
                              onChange={e => this.onChangeHandler(e)}
                              type="number" name="plan"/>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Обновить
                    </MDBBtn>
                </div>
            </MDBContainer>
        )
    }
}
