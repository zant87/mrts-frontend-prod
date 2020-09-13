import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast, MDBScrollbar, MDBContainer, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";

export default class AdminStructurePropertyEditPage extends React.Component {

    state = {
        initialized: false,
    };

    constructor(props) {
        super(props);
        console.log('Props in constructor =', props);

        this.state.dataTypes = props.dataTypes.map(item => {
                if (item.id === props.data.dataTypeId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.okeis = props.okeis.map(item => {
                if (item.id === props.data.okeiId) {
                    return {value: item.id, text: item.name, checked: true};
                } else {
                    return {value: item.id, text: item.name, checked: false};
                }
            }
        );

        this.state.id = props.data.id;
        this.state.code = props.data.code;
        this.state.name = props.data.name;
        this.state.dataTypeId = props.data.dataTypeId;
        this.state.okeiId = props.data.okeiId;

    }

    setOkei = event => {
        console.log('okeiID =', event[0]);
        this.setState({okeiId: event[0]});
    }

    setDataType = event => {
        console.log('dataTypeId =', event[0]);
        this.setState({dataTypeId: event[0]});
    }

    doSave = (e, close) => {

        if (this.props.action === 'edit') {

            const responseData = {
                id: this.state.id,
                code: this.state.code,
                name: this.state.name,
                dataTypeId: this.state.dataTypeId,
                okeiId: this.state.okeiId
            };

            console.log(responseData);

            appAxios({
                url: `user-properties`,
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
        } else {

            const responseData = {
                code: this.state.code,
                name: this.state.name,
                dataTypeId: this.state.dataTypeId,
                okeiId: this.state.okeiId
            };

            console.log(responseData);

            appAxios({
                url: `user-properties`,
                method: 'POST',
                data: responseData
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
                if (close) {
                    this.props.toggleModal();
                }
            });

        }
    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    };

    render() {

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.props.data.id} disabled={true} outline={true} type="number"/>

                    <MDBInput label="Код"
                              value={this.state.code}
                              outline={true}
                              name="code"
                              onChange={e => this.onChangeHandler(e)}
                              type="text"
                    />

                    <MDBInput label="Наименование"
                              value={this.state.name}
                              outline={true}
                              name="name"
                              onChange={e => this.onChangeHandler(e)}
                              type="text"
                    />

                    <MDBSelect label="Тип данных"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.dataTypes}
                               outline={true}
                               getValue={e => this.setDataType(e)}
                    />

                    <MDBSelect label="Единица измерения"
                               search={true}
                               searchLabel={'Поиск'}
                               options={this.state.okeis}
                               outline={true}
                               getValue={e => this.setOkei(e)}
                    />

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
