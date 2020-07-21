import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";

export default class AdminStructureFormulasEditPage extends React.Component {

    state = {
        data: {},
        isLoading: false
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = this.props.data;
    }

    componentDidMount() {
    };

    doSave = () => {
        const responseData = this.state;

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

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {

        console.log(this.state);

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.state.id} disabled={true} type="number" outline={true}/>

                    <MDBInput label="Тип транспорта" value={this.state.transportTypeName}
                              type="textarea" rows={3} outline={true}/>

                    <MDBInput label="Наименование" value={this.state.name}
                              type="textarea" rows={3} outline={true}/>

                    <MDBInput label="Описание" value={this.state.description}
                              type="textarea" rows={3} outline={true}/>

                    <MDBInput type="textarea" label="Формула" value={this.state.formula} rows={3}
                              onChange={this.onChangeHandler} name='formula' outline={true}/>

                    <MDBBtn color="primary" type="none" onClick={this.doSave}>
                        Сохранить
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}
