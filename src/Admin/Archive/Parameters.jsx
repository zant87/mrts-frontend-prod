import React from 'react';
import { connect } from "react-redux";
import { getParameterValues } from "@/_reducers/archive-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBCol, MDBRow, MDBSelect, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

class AdminArchiveParametersPage extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
                page: 0,
                count: 0,
                data: [],
                isLoading: false,
                modal: false,

                transportTypeId: '',
                dataProviderId: '',
                okudId: '',
                parameterId: '',
                year: '',
                quarterId: '',

                transportTypeText: '',
                dataProviderText: '',
                okudText: '',
                parameterText: '',
                yearText: '',
                quarterText: '',

                transportTypeList: [],
                dataProviderList: [], 
                okudList: [],         
                parameterList: [], 
                yearList: [],  
                quarterList: [],

                searchBystr: '',

            }
        // this.filterData = this.filterData.bind(this);
        this.getParameterData = this.getParameterData.bind(this);
        this.getData = this.getData.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidMount() {
        // this.getData();
        this.getParameterData();

        this.getTransportTypeList();
        this.getDataProviderList();
        this.getParameterList();
        this.getOkudList();
        this.getQuarterList();
        this.getDataYearList();
    }

    componentDidUpdate(prevProps) {

        if (this.props.parameterVals !== prevProps.parameterVals) {
            if (this.props.parameterVals) {
                // console.log(" parameterVals ---> %j", this.props.parameterVals)
                const { parameterVals } = this.props;
                this.setState({
                   data: parameterVals,
                });
            }
        }
    }


    getParameterData = () => {
        const { transportTypeId, dataProviderId, okudId, parameterId, year, quarterId, fields } = this.state;



        this.props.getParameterValues(transportTypeId, dataProviderId, okudId, parameterId, year, quarterId);
    }

    filterData = async () => {

        const { transportTypeId, dataProviderId, okudId, parameterId, year, quarterId } = this.state;
        this.setState({isLoading: true});
        this.toggle();

        appAxios.get(`/views/i-1-s-all?transportTypeId.equals=` + transportTypeId + 
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

                this.onReset();
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
                        return {value: item.id, text: item.code, checked: false};
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
            okudId: e.toString()
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
            // data: [],
       });
       this.getTransportTypeList();
       this.getDataProviderList();
       this.getParameterList();
       this.getOkudList();
       this.getQuarterList();
       this.getDataYearList();

    }

     toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
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

        const { isFetchingParameterData } = this.props;
        // console.log("parameterVals: %j", parameterVals );

    return (
        <MDBContainer fluid>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Архив показателей для расчета индикаторов ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <div className="text-right">
                   {this.state.searchBystr} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBBtn color="info" onClick={this.toggle}>Фильтры</MDBBtn>
                </div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}  size="lg"  >
                  <MDBModalHeader toggle={this.toggle}>&nbsp;&nbsp;&nbsp;&nbsp;Архив показателей для расчета индикаторов ТС</MDBModalHeader>
                  <MDBModalBody>
                     <MDBRow around={true}>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect id="transportTypeIdSel" search searchId={'transportTypeId'}
                                           label="Вид транспорта"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.transportTypeList}
                                           getTextContent={e => this.setState({ transportTypeText: e})}
                                           getValue={this.setTransportType}>
                                </MDBSelect>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect ref={this.dataProviderIdRef} id="dataProviderIdSel" search searchId={'dataProviderId'}
                                           label="Источник данных"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.dataProviderList}
                                           getTextContent={e => this.setState({ dataProviderText: e})}
                                           getValue={e => this.setState({ dataProviderId: e})}>
                                </MDBSelect>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect ref={this.okudIdRef} id="okudIdSel" search searchId={'okudId'}
                                           label="ОКУД"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.okudList}
                                           getTextContent={e => this.setState({ okudText: e})}
                                           getValue={e => this.setState({ okudId: e})}>
                                </MDBSelect>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow around={true}>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect ref={this.parameterIdRef} id="parameterIdSel" search searchId={'parameterId'}
                                           label="Показатель"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.parameterList}
                                           getTextContent={e => this.setState({ parameterText: e})}
                                           getValue={this.setParameter}>
                                </MDBSelect>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect id="yearSel" search searchId={'year'}
                                           label="Отчетный год"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.yearList}
                                           getTextContent={e => this.setState({ yearText: e})}
                                           getValue={this.setYear}>
                                </MDBSelect>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                                <MDBSelect id="quarterIdSel" search searchId={'quarterId'}
                                           label="Отчетный квартал"
                                           search={true}
                                           searchLabel={'Поиск'}
                                           selected=""
                                           options={this.state.quarterList}
                                           getTextContent={e => this.setState({ quarterText: e})}
                                           getValue={this.setQuarter}>
                                </MDBSelect>
                            </MDBCol>
                        </MDBRow> 

                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Закрыть</MDBBtn>
                    <MDBBtn color="primary" onClick={this.filterData} >Получить данные</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
            <MDBRow>
               <TableContainer data={this.state.data} isLoading={isFetchingParameterData} columns={columns} title={"Архив показателей для расчета индикаторов ТС"}/> 
            </MDBRow>
        </MDBContainer>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    parameterVals: state.archivePage.parameterVals,
    isFetchingParameterData: state.archivePage.isFetchingParameterData,
  };
};

export default compose(connect(mapStateToProps, {
                                getParameterValues,
                              }), withRouter )(AdminArchiveParametersPage);

