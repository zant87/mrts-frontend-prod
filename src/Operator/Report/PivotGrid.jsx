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

export default class OperatorReportPivotGridPage extends React.Component {

    state = {
        isLoading: true,
        dataSource: {}
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-5-s?size=5000`)
            .then(res => {
                console.log(res);
                // const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({
                    data: data, isLoading: false, dataSource:
                        new PivotGridDataSource({
                            fields: [
                                {
                                    caption: 'Источник данных',
                                    width: 120,
                                    dataField: 'dataProviderName',

                                },
                                {
                                    caption: 'Вид транспорта',
                                    width: 120,
                                    dataField: 'transportTypeName',
                                },
                                {
                                    caption: 'Форма',
                                    width: 120,
                                    dataField: 'formCode',
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
                <MDBRow center className='my-5'>
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
                        height={600}
                        showRowGrandTotals={false}
                        showRowTotals={false}
                        showBorders={true}>
                        <Export enabled={true} fileName="Фактические значения показателей"/>
                        <FieldChooser enabled={true}/>
                    </PivotGrid>
                </MDBRow>
            </MDBContainer>
        );
    }
}

