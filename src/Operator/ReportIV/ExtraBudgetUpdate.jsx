import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import 'moment/locale/ru';

export default class OperatorReportExtraBudgetUpdatePage extends React.Component {

    /*
            { name: 'year', label: 'Отчетный год'},
            { name: 'directionName', label: 'Направление расходов' },
            { name: 'costTypeName', label: 'Вид расходов'},
            { name: 'fact', label: 'Фактические объемы исполнения, млн. руб.'},
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
        */

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: Number(this.props.location.state[5]),
            documentId: Number(this.props.location.state[6]),
            fact: Number(this.props.location.state[3]),
            plan: Number(this.props.location.state[4]),
            year: this.props.location.state[0],
            directionName: this.props.location.state[1],
            costTypeName: this.props.location.state[2],
            isLoading: false
        };
    }

    /*
            { name: 'year', label: 'Отчетный год'},
            { name: 'directionName', label: 'Направление расходов' },
            { name: 'costTypeName', label: 'Вид расходов'},
     */

    /*
            @RequestParam("pID") Long pID,
            @RequestParam("pDoc") Long pDoc,
            @RequestParam("pFact") BigDecimal pFact){
    */

    doUpdate =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-10-s/update?pID=${this.state.id}&pDoc=${this.state.documentId}&pPlan=${this.state.plan}&pFact=${this.state.fact}`)
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
                        <MDBInput label="Отчетный год" value={this.state.year} disabled={true} type="number" name="year"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Направление расходов" value={this.state.directionName} disabled={true} type="text" name="directionName"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Вид расходов" value={this.state.costTypeName} disabled={true} type="text" name="directionName"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Фактические объемы исполнения, млн. руб." value={this.state.fact} onChange={this.onChangeHandler} type="number" name="fact"/>
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
