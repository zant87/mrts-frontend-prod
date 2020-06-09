import React from 'react';
import PivotGrid, {
    FieldChooser,
    Export,
    HeaderFilter
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBSelect, MDBBtn} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class OperatorReportFactPivotPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                    fields: [{
                            dataField: 'id',
                            visible: false
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
                            area: 'row'
                        },
                        {
                            caption: 'Источник данных',
                            width: 120,
                            dataField: 'dataProviderName',
                            area: 'row'
                        },
                        {
                            caption: 'ОКУД',
                            width: 120,
                            dataField: 'okudName',
                            area: 'row'
                        },
                        {
                            caption: 'Показатель',
                            dataField: 'parameterName',
                            width: 150,
                            area: 'row'
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
                            summaryType: 'sum',
                            area: 'data'
                        }],
                    isLoading: true,
                    dataSource: {},

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
                };
        this.filterData = this.filterData.bind(this);
        this.getData = this.getData.bind(this);
        this.onReset = this.onReset.bind(this);
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

        const { transportTypeId, dataProviderId, okudId, parameterId, year, quarterId, fields } = this.state;

       if (transportTypeId === '' && dataProviderId === '' && okudId === '' && parameterId === '' && year === '' && quarterId === '') {
            this.getData();
        } else {

                appAxios.get(`/views/k-5-s?transportTypeId.equals=` + transportTypeId + 
                                          `&dataProviderId.equals=` + dataProviderId + 
                                          `&okudId.equals=` + okudId +
                                          `&parameterId.equals=` + parameterId +
                                          `&year.equals=` + year +
                                          `&quarterId.equals=` + quarterId)
                    .then(res => {
                        console.log(res);
                        const count = Number(res.headers['x-total-count']);
                        console.log('Всего от k5 получено ', count, ' записей');
                        const data = res.data;
                        this.setState({
                            data: data, isLoading: false, 
                            dataSource: new PivotGridDataSource({ fields: fields, store: data })
                        });
                    });
       }
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
            dataSource: {},
        });
        this.getTransportTypeList();
        this.getDataProviderList();
        this.getParameterList();
        this.getOkudList();
        this.getQuarterList();
        this.getDataYearList(); 
    }

    render() {

        const {dataSource, isLoading} = this.state;

        return (
            <MDBContainer fluid>
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

