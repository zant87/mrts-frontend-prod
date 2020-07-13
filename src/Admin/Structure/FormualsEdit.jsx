import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";

export default class AdminStructureFormulasEditPage extends React.Component {

    state = {
        row: {},
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.state = this.props.location.state;
    }

    componentDidMount() {
    };

    doSave = () => {
        const responseData = {
            id: this.state.id,
            formula: this.state.formula
        };

        appAxios({
            url: `indicators`,
            method: 'PUT',
            data: responseData
        }).then((response) => {
            const message = response.headers["x-mrts-backend-params"];
            toast.success(`Успешно обновлена запись с ID ${message}`, {
                closeButton: false
            });
        });
    }

    doBack = () => {
        history.back();
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {

        console.log(this.state);

        return (
            <MDBCol md='8' className='mx-auto my-3'>
                <h2 className='text-center my-2'>Редактирование формулы расчета индикаторов</h2>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="#" value={this.state.id} disabled={true} type="number"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Тип транспорта" value={this.state.transportTypeName} disabled={true}
                                  type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Наименование" value={this.state.name} disabled={true}
                                  type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Описание" value={this.state.description} disabled={true}
                                  type="text"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput type="textarea" label="Формула" value={this.state.formula} rows="10"
                                  onChange={this.onChangeHandler} name='formula'/>
                    </MDBCol>
                </MDBRow>
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Вариант реализации стратегии" value={this.state.scenarioName} disabled={true} type="text"/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Цель" value={this.state.goalName} disabled={true} type="text"/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Индикатор" value={this.state.indicatorName} disabled={true} type="text"/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Вид транспорта" value={this.state.transportTypeName} disabled={true} type="text"/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Этап реализации стратегии" value={this.state.indicatorDate} disabled={true} type="text"/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput label="Значение индикатора" value={this.state.value} type="number" name="value" onChange={this.onChangeHandler}/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBSelect label="Единица измерения"*/}
                {/*                   search={true}*/}
                {/*                   searchLabel={'Поиск'}*/}
                {/*                   options={this.state.okeiList}*/}
                {/*                   getValue={this.setOkeiElement}>*/}
                {/*        </MDBSelect>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                <MDBRow around>
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
