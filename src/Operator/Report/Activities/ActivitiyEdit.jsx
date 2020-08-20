import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import {authenticationService} from "@/_services";

export default class OperatorReportActivityEditPage extends React.Component {

    state = {
        initialized: false
    };

    constructor(props) {
        super(props);
        console.log('Props in constructor =', props);
    };

    getActivityReportAndUser = () => {

        authenticationService.currentUser.subscribe((x) =>
            appAxios.get(`activity-reports/${this.props.data.activityReportId}`).then(res => {
                console.log(res.data);
                res.data.username = x.fullname;
                this.setState(res.data);
            })
        )

    }

    componentDidMount() {
        this.getActivityReportAndUser();
    }

    doSave = (e) => {

        if (this.props.action === 'edit') {

            const responseData = this.state;
            console.log('Sending ', responseData);

            appAxios({
                url: `activity-reports`,
                method: 'PUT',
                data: responseData
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно обновлена запись с ID ${message}`, {
                    closeButton: false
                });
                this.props.tableRef.current.onQueryChange();
            });
        }

    }

    onChangeHandler = event => {
        console.log(event);
        this.setState({[event.target.name]: event.target.value});
    };

    render() {

        return (
            <MDBContainer>
                <div className="scrollbar my-1 mx-auto" style={{minHeight: '600px', maxHeight: '600px'}}>
                    <MDBInput label="#" value={this.state.id} type="number" name="id" outline/>
                    <MDBInput label="Наименование мероприятия" value={this.props.data.activityName} type="textarea"
                              rows="2"
                              name="activityName" outline/>
                    <MDBInput type="textarea" value={this.state.description} label="Описание" rows="5"
                              onChange={e => this.onChangeHandler(e)} name='description' outline/>
                    <MDBInput type="textarea" value={this.state.report} label="Отчет" rows="5"
                              onChange={e => this.onChangeHandler(e)} name='report' outline/>
                    <MDBBtn color="primary" type="none" onClick={e => this.doSave(e)}>
                        Обновить
                    </MDBBtn>
                </div>
            </MDBContainer>
        )
    }
}
