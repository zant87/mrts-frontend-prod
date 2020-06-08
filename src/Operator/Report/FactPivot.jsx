import React from 'react';
import PivotGrid, {
    FieldChooser,
    Export,
    HeaderFilter
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class OperatorReportFactPivotPage extends React.Component {

    state = {
        isLoading: true,
        dataSource: {},

        transportTypeId: '',
        dataProviderId: '',
        okudId: '',

        transportTypeList: [],
        dataProviderList: [],
        okudList: [],
    };

    componentDidMount() {
        this.getData();
    };

    handleChange = e => {

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
                        new PivotGridDataSource({
                            fields: [
                                {
                                    dataField: 'id',
                                    visible: false
                                },
                                {
                                    dataField: 'dataProviderName',
                                    visible: false
                                },
                                {
                                    dataField: 'transportTypeCode',
                                    visible: false
                                },
                                {
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
                                    summaryType: 'sum',
                                    area: 'data'
                                }
                            ],
                            store: data
                        })
                });
            });
    };

    render() {

        const {dataSource, isLoading} = this.state;

        // dataProvider

        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'transportTypeId'}
                                   label="Вид транспорта"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.transportTypeList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'dataProviderId'}
                                   label="Источник данных"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.dataProviderList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.algorithmList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'okudId'}
                                   label="ОКУД"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.okudList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                {/* <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.algorithmList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.algorithmList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBSelect searchId={'algorithm'}
                                   label="Алгоритм"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.algorithmList}
                                   getValue={this.handleChange}>
                        </MDBSelect>
                    </MDBCol>
                </MDBRow> */}

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
                            <HeaderFilter
                                allowSearch={true}
                                visible={true}
                                width={300}
                                height={400}
                              />
                            <Export enabled={true} fileName="Фактические значения показателей"/>
                            <FieldChooser enabled={true}/>
                        </PivotGrid>}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

