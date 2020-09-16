import React from 'react';
import PivotGrid, {
    FieldChooser,
    Export,
    HeaderFilter
} from 'devextreme-react/pivot-grid';
import { PropTypes, instanceOf } from 'prop-types';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBSpinner,
    MDBSelect,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from "mdbreact";
import appAxios from "../../../_services/appAxios";

export default class OperatorReportFactPivotPage extends React.Component {

     dataProviderIdRef = React.createRef();
     okudIdRef = React.createRef();
     parameterIdRef = React.createRef();
    /*
    options: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      disabled: PropTypes.bool,
      icon: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
     */
    constructor(props) {
        super(props);
        this.state = {
                    fields: [{
                            dataField: 'id',
                            visible: false,
                        }, {
                            dataField: 'dataProviderName',
                            visible: false
                        },{
                            dataField: 'transportTypeCode',
                            visible: false
                        },{
                            dataField: 'formCode',
                            visible: false
                        },
                        {
                            dataField: 'okudCode',
                            visible: false
                        },
                        {
                            dataField: 'parameterCode',
                            visible: false
                        },
                        {
                            dataField: 'transportTypeCode',
                            visible: false
                        },
                        {
                            dataField: 'formParameterId',
                            visible: false
                        },
                        {
                            dataField: 'monthId',
                            visible: false
                        },
                        {
                            dataField: 'monthName',
                            visible: false
                        },
                        {
                            dataField: 'quarterId',
                            visible: false
                        },
                        {
                            dataField: 'dataProviderId',
                            visible: false
                        },
                        {
                            dataField: 'dataProviderCode',
                            visible: false
                        },
                        {
                            dataField: 'okeiCode',
                            visible: false
                        },
                        {
                            dataField: 'okeiName',
                            visible: false
                        },
                        {
                            dataField: 'okeiId',
                            visible: false
                        },
                        {
                            dataField: 'formId',
                            visible: false
                        },
                        {
                            dataField: 'formParameterId',
                            visible: false
                        },
                        {
                            dataField: 'parameterId',
                            visible: false
                        },
                        {
                            dataField: 'transportTypeId',
                            visible: false
                        },
                        {
                            dataField: 'okudId',
                            visible: false
                        },
                        {
                            caption: 'Вид транспорта',
                            width: 120,
                            dataField: 'transportTypeName',
                            area: 'row',
                            expanded: true,
                        },
                        {
                            caption: 'Источник данных',
                            width: 120,
                            dataField: 'dataProviderName',
                            area: 'row',
                            expanded: true,
                        },
                        {
                            caption: 'ОКУД',
                            width: 120,
                            dataField: 'okudName',
                            area: 'row',
                            expanded: true,
                        },
                        {
                            caption: 'Показатель',
                            dataField: 'parameterName',
                            width: 150,
                            area: 'row',
                            expanded: true,
                        },

                        {
                            caption: 'Отчетный год',
                            dataField: 'year',
                            dataType: 'number',
                            area: 'column'
                        },
                        {
                            caption: 'Отчетный квартал',
                            dataField: 'quarterName',
                            area: 'column'
                        },
                        {
                            caption: 'Значение показателя',
                            dataField: 'value',
                            dataType: 'number',
                            format: "#,###,###,##0.##",
                            summaryType: 'max',
                            area: 'data'
                        }],
                    isLoading: true,
                    dataSource: {},
                    modal: false,

                    searchBystr: '',

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
                };
        this.filterData = this.filterData.bind(this);
        this.getData = this.getData.bind(this);
        this.onReset = this.onReset.bind(this);
        this.getTransportTypeList = this.getTransportTypeList.bind(this);
        this.getDataProviderList = this.getDataProviderList.bind(this);
        this.getParameterList = this.getParameterList.bind(this);
        this.getQuarterList = this.getQuarterList.bind(this);
        this.getDataYearList = this.getDataYearList.bind(this);
        this.getOkudList = this.getOkudList.bind(this);

    }

    componentDidMount() {
        // this.getData();
        this.getTransportTypeList();
        this.getDataProviderList();
        this.getParameterList();
        this.getOkudList();
        this.getQuarterList();
        this.getDataYearList();
    };

    filterData = () => {
        this.setState({isLoading: true});

        const { transportTypeId, dataProviderId, okudId, parameterId, year, quarterId, transportTypeText, dataProviderText, okudText, parameterText, yearText, quarterText, fields } = this.state;

        this.toggle();

       if (transportTypeId === '' && dataProviderId === '' && okudId === '' && parameterId === '' && year === '' && quarterId === '') {
            // console.log("GET ALL")
            this.getData();
        } else {

               this.setState({
                  searchBystr: "Фильтр по: " + transportTypeText + " " + dataProviderText + " " + okudText + " " + parameterText + " " + yearText + " " + quarterText
               });
                const url = `/views/k-5-s-all?transportTypeId.equals=` + transportTypeId + 
                                          `&dataProviderId.equals=` + dataProviderId + 
                                          `&okudId.equals=` + okudId +
                                          `&parameterId.equals=` + parameterId +
                                          `&year.equals=` + year +
                                          `&quarterId.equals=` + quarterId
                // console.log("k-5-s-all url: %s", url )

                appAxios.get(url)
                    .then(res => {
                        console.log(res);
                        const count = Number(res.headers['x-total-count']);
                        console.log('Всего от k5 получено ', count, ' записей');
                        const data = res.data;
                        this.setState({
                            data: data, isLoading: false, 
                            dataSource: new PivotGridDataSource({ fields: fields, store: data })
                        });

                        this.onReset();

                    });
       }
    };

    getTransportTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-transport-types`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id.toString(), text: item.name.toString(), checked: false, icon: null, key: item.id};
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
                        return {value: item.id.toString(), text: item.name.toString(), checked: false, icon: null, key: item.id};
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
                        return {value: item.id.toString(), text: item.name.toString(), checked: false, icon: null, key: item.id};
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
                        return { value: item.id.toString(), text: ''+item.name.toString(), checked: false, icon: null, key: item.id};
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
                        return {value: item.id.toString(), text: ''+item.name.toString(), checked: false, icon: null, key: item.id};
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
                        return {value: item.year.toString(), text: ''+item.year.toString(), checked: false, icon: null, key: item.id};
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


    getData = () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-5-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                console.log('Всего от k5 получено ', count, ' записей');
                const data = res.data;
                this.setState({
                    data: data, isLoading: false, dataSource:
                        new PivotGridDataSource({ fields: this.state.fields, store: data })
                });
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
            // dataSource: {},
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

    render() {

        const {dataSource, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow around={true}>

                </MDBRow>
                <div className="text-right">
                   {this.state.searchBystr} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBBtn color="info" onClick={this.toggle}>Фильтры</MDBBtn>
                </div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}  size="lg"  >
                  <MDBModalHeader toggle={this.toggle}>&nbsp;&nbsp;&nbsp;&nbsp;Фактические значения показателей</MDBModalHeader>
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
                           {/* <MDBCol md="3" className="mb-3">
                                <MDBBtn color="primary" type="none" onClick={this.filterData}>Получить данные</MDBBtn>
                            </MDBCol> */}
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
                            {/* <MDBCol md="3" className="mb-3">
                                <MDBBtn color="primary" type="none" onClick={this.onReset}>Oчистить фильтры</MDBBtn>
                            </MDBCol> */}
                        </MDBRow> 

                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Закрыть</MDBBtn>
                    <MDBBtn color="primary" onClick={this.filterData} >Получить данные</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        {isLoading && <MDBSpinner multicolor/>}
                        {!isLoading && <PivotGrid
                            id="fact"
                            dataSource={dataSource}
                            allowSorting={true}
                            allowFiltering={true}
                            allowExpandAll={true}
                            loadPanel={{enabled: true}}
                            showColumnGrandTotals={false}
                            showColumnTotals={false}
                            rowHeaderLayout={"tree"}
                            height={'680'}
                            showRowGrandTotals={false}
                            showRowTotals={false}
                            showBorders={true}
                            >
                            {/* <HeaderFilter
                                allowSearch={true}
                                visible={true}
                                width={300}
                                height={400}
                              /> */}
                            <Export enabled={true} fileName="Фактические значения показателей"/>
                            <FieldChooser enabled={true}/>
                        </PivotGrid>}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

