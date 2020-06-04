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

export default class OperatorReportAppropriationsPivotPage extends React.Component {

    state = {
        isLoading: true,
        dataSource: {}
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-9-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                console.log('Всего от k9 получено ', count, ' записей');
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
                                    dataField: 'documentCode',
                                    visible: false
                                },
                                {
                                    dataField: 'documentName',
                                    visible: false
                                },
                                {
                                    dataField: 'documentDate',
                                    visible: false
                                },
                                {
                                    dataField: 'directionCode',
                                    visible: false
                                },
                                {
                                    dataField: 'fundingCode',
                                    visible: false
                                },
                                {
                                    dataField: 'costTypeCode',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionCode',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionName',
                                    visible: false
                                },
                                {
                                    dataField: 'beginDate',
                                    visible: false
                                },
                                {
                                    dataField: 'endDate',
                                    visible: false
                                },
                                {
                                    dataField: 'documentId',
                                    visible: false
                                },
                                {
                                    dataField: 'directionId',
                                    visible: false
                                },
                                {
                                    dataField: 'fundingId',
                                    visible: false
                                },
                                {
                                    dataField: 'costTypeId',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionId',
                                    visible: false
                                },
                                {
                                    caption: 'Вид расходов',
                                    width: 120,
                                    dataField: 'costTypeName',
                                    area: 'row'
                                },
                                {
                                    caption: 'Направление расходов',
                                    width: 120,
                                    dataField: 'directionName',
                                    area: 'row'
                                },
                                {
                                    caption: 'Источник финансирования',
                                    width: 120,
                                    dataField: 'fundingName',
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
                                    dataField: 'quarter',
                                    dataType: 'number',
                                    area: 'column'
                                },
                                {
                                    caption: 'Запланировано',
                                    dataField: 'plan',
                                    dataType: 'number',
                                    summaryType: 'sum',
                                    area: 'data'
                                },
                                {
                                    caption: 'Кассовое исполнение',
                                    dataField: 'fact',
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

