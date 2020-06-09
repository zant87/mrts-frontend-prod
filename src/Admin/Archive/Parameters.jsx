import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow, MDBSelect, MBBBtn} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

export default class AdminArchiveParametersPage extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
                page: 0,
                count: 0,
                data: [],
                isLoading: false,

                transportTypeId: '',
                dataProviderId: '',
                okudId: '',
                parameterId: '',
                year: '',
                quarterId: '',

                transportTypeList: [],
                dataProviderList: [], 
                okudList: [],         
                parameterList: [], 
                yearList: [],  
                quarterList: [],

            }
        this.filterData = this.filterData.bind(this);
        this.getData = this.getData.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getTransportTypeList();
        this.getDataProviderList();
        this.getParameterList();
        this.getOkudList();
        this.getQuarterList();
        this.getDataYearList();
    }

    filterData = async () => {

        this.setState({isLoading: true});
        appAxios.get(`/views/i-1-s?transportTypeId.equals=` + transportTypeId + 
                                          `&dataProviderId.equals=` + dataProviderId + 
                                          `&okudId.equals=` + okudId +
                                          `&parameterId.equals=` + parameterId +
                                          `&year.equals=` + year +
                                          `&quarterId.equals=` + quarterId)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    getTransportTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-transport-types`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({transportTypeList: data, isLoading: false});
            })
    };

    getDataProviderList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-data-providers`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({dataProviderList: data, isLoading: false});
            })
    };

    getParameterList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/parameters`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({parameterList: data, isLoading: false});
            })
    };

    getOkudList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-okuds`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({okudList: data, isLoading: false});
            })
    };

    getQuarterList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-quarters`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({quarterList: data, isLoading: false});
            })
    };

    getDataYearList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-years`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.year, text: item.year, checked: false};
                })
                this.setState({yearList: data, isLoading: false});
            })
    };

    setTransportType = e => {
        this.setState({
            transportTypeId: e.toString()
        });
    }

    setProvider = e => {
        this.setState({
            dataProviderId: e.toString()
        });
    }

    setOkud = e => {
        this.setState({
            dataOkudId: e.toString()
        });
    }

    setParameter = e => {
        this.setState({
            parameterId: e.toString()
        });
    }
    
    setYear = e => {
        this.setState({
            year: e.toString()
        });
    }
    setQuarter = e => {
        this.setState({
            quarterId: e.toString()
        });
    }

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/i-1-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    onReset = () => {

       this.setState({
            transportTypeId: '',
            dataProviderId: '',
            okudId: '',
            parameterId: '',
            year: '',
            quarterId: '',
            data: [],
       });
       this.getTransportTypeList();
       this.getDataProviderList();
       this.getParameterList();
       this.getOkudList();
       this.getQuarterList();
       this.getDataYearList();
    }

        /* year": 2017,
        "quarterName": "I квартал",
        "okudCode": "0615096",
        "okudName": "1-море",
        "parameterCode": "МТ_ОТПРАВЛЕНО_ГРУЗОВ_СЕВЕР",
        "parameterName": "Отправлено грузов в районы Крайнего Севера и приравненные к ним местности (на морском транспорте)",
        "transportTypeName": "Морской транспорт",
        "dataProviderCode": "Росморречфлот",
        "beginDate": "2020-04-05",
        "endDate": "2099-12-31",
        "value": 473,
        "okudId": 12,
        "parameterId": 37,
        "transportTypeId": 17,
        "dataProviderId": 24,
        "quarterId": 1,
        "okeiId":
        */ 

   render() {

     const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: true, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'okudName', title: 'ОКУД', filtering: true, editable: 'never'},
            {field: 'parameterName', title: 'Показатель', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Тип транспорта', filtering: true, editable: 'never'},
            {field: 'dataProviderCode', title: 'Источник', filtering: true, editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: true, editable: 'never' },
        ];

        const { data, isLoading } = this.state;

    return (
        <MDBContainer fluid>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Архив показателей для расчета индикаторов ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'transportTypeId'}
                                   label="Вид транспорта"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.transportTypeList}
                                   getValue={this.setTransportType}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'dataProviderId'}
                                   label="Источник данных"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.dataProviderList}
                                   getValue={this.setProvider}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'okudId'}
                                   label="ОКУД"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.okudList}
                                   getValue={this.setOkud}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBBtn color="primary" type="none" onClick={this.filterData}>Получить данные</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow around={true}>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'parameterId'}
                                   label="Показатель"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.parameterList}
                                   getValue={this.setParameter}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'year'}
                                   label="Отчетный год"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.yearList}
                                   getValue={this.setYear}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'quarterId'}
                                   label="Отчетный квартал"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBBtn color="primary" type="none" onClick={this.onReset}>Oчистить фильтры</MDBBtn>
                    </MDBCol>
                </MDBRow>
            <MDBRow>
               <TableContainer data={this.state.data} isLoading={this.state.isLoading} columns={columns} title={"Архив показателей для расчета индикаторов ТС"}/> 
            </MDBRow>
        </MDBContainer>
    );
  }
};

