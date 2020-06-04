import React from 'react';
import PivotGrid, {
    FieldChooser,
    Export
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class OperatorReportFactPivotPage extends React.Component {

    state = {
        isLoading: true,
        dataSource: {}
    };

    componentDidMount() {
        this.getData();
    };

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

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        {isLoading && <MDBSpinner multicolor/>}
                        <PivotGrid
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
                            showBorders={true}>
                            <Export enabled={true} fileName="Фактические значения показателей"/>
                            <FieldChooser enabled={true}/>
                        </PivotGrid>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

