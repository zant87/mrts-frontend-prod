import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import moment from "moment";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingDocumentPage extends React.Component {

    constructor(props) {

        super(props);
        console.log(props);

        this.state = {
            id: 0,
            code: "",
            name: "",
            // description: "",
            // beginDate: "2019-12-31",
            // endDate: "2099-12-31",
            documentDate: "2019-12-31",
            documentTypeId: Number(props.location.state.documentTypeId),
            documentTypeSelected: "",
            yearId: Number(props.location.state.yearId),
            yearSelected: 0,
            quarterId: Number(props.location.state.quarterId),
            quarterSelected: 0,
            documentTypeList: [],
            yearList: [],
            quarterList: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.getDocumentTypeList();
        this.getYearList();
        this.getQuarterList();
    };

    getDocumentTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/document-types?code.in=PROJECT_BUDGET_REPORT&code.in=TOTAL_BUDGET_REPORT&code.in=BUDGET_REPORT&code.in=ACTIVITY_REPORT&code.in=PROJECT_REPORT`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                    if(item.id === this.state.documentTypeId){
                        selected = item;
                        return {value: item.id, text: item.name, code: item.code, checked: true}
                    }
                    else
                        return {value: item.id, text: item.name, code: item.code, checked: false};
                })
                this.setState({documentTypeList: data, isLoading: false, documentTypeSelected: selected.code});
            })
    };

    setDocumentType = event => {
        this.setState({documentTypeId: event.toString()});
    }

    getYearList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-years`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                    if(item.id === this.state.yearId){
                        selected = item;
                        return {value: item.id, text: item.year, checked: true};
                    }
                    else
                        return {value: item.id, text: item.year, checked: false};
                })
                this.setState({yearList: data, isLoading: false, yearSelected: selected.year});
            })
    };

    setYear = event => {
        this.setState({yearId: Number(event)});
    }

    getQuarterList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-quarters`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                    if(item.id === this.state.quarterId){
                        selected = item;
                        return {value: item.id, text: item.name, checked: true};
                    }
                    else
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({quarterList: data, isLoading: false, quarterSelected: selected.id});
            })
    };

    setQuarter = event => {
        this.setState({quarterId: Number(event)});
    }

    onChangeHandler = event => {
        console.log(this.state);
        this.setState({[event.target.name]: event.target.value});
    };

    doCreate = () => {

        console.log(this.state);

        /*
        *   @RequestParam("pDocTypeCode") String pDocTypeCode,
            @RequestParam("pYear") Long pYear,
            @RequestParam("pQuarter") Long pQuarter,
            @RequestParam("pDocDate") LocalDate pDocDate,
            @RequestParam("pCode") String pCode,
            @RequestParam("pName") String pName)
        * */

        this.setState({ isLoading: true });
        appAxios.get(`/documents/create?pDocTypeCode=${this.state.documentTypeSelected}&pYear=${this.state.yearSelected}
        &pQuarter=${this.state.quarterSelected}&pDocDate=${this.state.documentDate}&pCode=${this.state.code}&pName=${this.state.name}`)
            .then(res => {
                console.log(res.data);
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешно создан документ с ID ${data}`, {
                    closeButton: false
                });
            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при создании документа`, {
                closeButton: false
            });
        });

        // const responseData = { code: this.state.code,
        //     name: this.state.name,
        //     description: this.state.description,
        //     beginDate: this.state.beginDate,
        //     endDate: this.state.endDate,
        //     documentDate: this.state.documentDate,
        //     documentTypeId: this.state.documentTypeId,
        //     yearId: this.state.yearId,
        //     quarterId: this.state.quarterId
        // };
        //
        // console.log(responseData);
        // appAxios({
        //     url: `documents`,
        //     method: 'POST',
        //     data: responseData
        // }).then((response) => {
        //     const message = response.headers["x-mrts-backend-params"];
        //     toast.success(`Успешно создан документ с ID ${message}`, {
        //         closeButton: false
        //     });
        // }).catch(function (error) {
        //     console.log(error);
        //     toast.error(`Ошибка при создании документа`, {
        //         closeButton: false
        //     });
        // });
    };

    doBack = () => {
        history.back();
    };

    // getBeginDate = (value) => {
    //     const date = moment(value);
    //     this.setState({beginDate: date.format('YYYY-MM-DD')});
    // }
    //
    // getEndDate = (value) => {
    //     const date = moment(value);
    //     this.setState({endDate: date.format('YYYY-MM-DD')});
    // }

    getDocumentDate = (value) => {
        const date = moment(value);
        this.setState({documentDate: date.format('YYYY-MM-DD')});
    }

    render() {

        return (
            <MDBCol md='8' className='mx-auto my-5'>
                <h2 className='text-center my-2'>Создание документа МРТС</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Код" value={this.state.code}  name="code" type="text" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Наименование" value={this.state.name} name="name" type="text" onChange={this.onChangeHandler} on/>
                    </MDBCol>
                </MDBRow>

                {/*<MDBRow>*/}
                {/*    <MDBCol md="12" className="mb-3">*/}
                {/*        <MDBInput type="textarea" label="Описание" value={this.state.description} name="description" rows="3" onChange={this.onChangeHandler}/>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}

                <MDBRow>

                    {/*<MDBCol md="4" className="mb-3">*/}
                    {/*    <label htmlFor='datepicker'>Начало действия документа</label>*/}
                    {/*    <MDBDatePicker getValue={this.getBeginDate}*/}
                    {/*                   format='YYYY-MM-DD'*/}
                    {/*                   locale={moment.locale('ru')}*/}
                    {/*                   okLabel='ОК'*/}
                    {/*                   name='beginDate'*/}
                    {/*                   keyboard={true}*/}
                    {/*                   invalidDateMessage='Неправильный формат даты'*/}
                    {/*                   valueDefault={new Date(this.state.beginDate)}*/}
                    {/*                   cancelLabel='Отмена'/>*/}
                    {/*</MDBCol>*/}
                    {/*<MDBCol md="4" className="mb-3">*/}
                    {/*    <label htmlFor='datepicker'>Конец действия документа</label>*/}
                    {/*    <MDBDatePicker getValue={this.getEndDate}*/}
                    {/*                   format='YYYY-MM-DD'*/}
                    {/*                   locale={moment.locale('ru')}*/}
                    {/*                   okLabel='ОК'*/}
                    {/*                   name='endDate'*/}
                    {/*                   keyboard={true}*/}
                    {/*                   invalidDateMessage='Неправильный формат даты'*/}
                    {/*                   valueDefault={new Date(this.state.endDate)}*/}
                    {/*                   cancelLabel='Отмена'/>*/}

                    {/*</MDBCol>*/}

                    <MDBCol md="4" className="mb-3">
                        <label htmlFor='datepicker'>Дата документа</label>
                        <MDBDatePicker getValue={this.getDocumentDate}
                                       format='YYYY-MM-DD'
                                       locale={moment.locale('ru')}
                                       okLabel='ОК'
                                       name='documentDate'
                                       keyboard={true}
                                       invalidDateMessage='Неправильный формат даты'
                                       valueDefault={new Date(this.state.documentDate)}
                                       cancelLabel='Отмена'/>

                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'DocumentType'}
                                   label="Тип документа"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.documentTypeList}
                                   getValue={this.setDocumentType}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'Year'}
                                   label="Год"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.yearList}
                                   getValue={this.setYear}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'Quarter'}
                                   label="Квартал"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>

                <MDBRow around={true}>
                    <MDBBtn color="primary" type="none" onClick={this.doCreate}>
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
