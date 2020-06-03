import React from 'react';
import PivotGrid, {
    FieldChooser,
    Export
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {MDBContainer, MDBRow} from "mdbreact";
import {sales} from "./pivot";

export default class OperatorReportPivotGridPage extends React.Component {

    render() {

        return (
            <MDBContainer fluid>
                <MDBRow center className='my-5'>
                    <PivotGrid
                        id="sales"
                        dataSource={dataSource}
                        allowSortingBySummary={true}
                        allowSorting={true}
                        allowFiltering={true}
                        allowExpandAll={true}
                        height={440}
                        showBorders={true}
                    >
                        <Export enabled={true} fileName="Sales"/>
                        <FieldChooser enabled={false}/>
                    </PivotGrid>
                </MDBRow>
            </MDBContainer>
        );
    }
}

const dataSource = new PivotGridDataSource({
    fields: [{
        caption: 'Region',
        width: 120,
        dataField: 'region',
        area: 'row'
    }, {
        caption: 'City',
        dataField: 'city',
        width: 150,
        area: 'row',
        selector: function (data) {
            return `${data.city} (${data.country})`;
        }
    }, {
        dataField: 'date',
        dataType: 'date',
        area: 'column'
    }, {
        caption: 'Sales',
        dataField: 'amount',
        dataType: 'number',
        summaryType: 'sum',
        format: 'currency',
        area: 'data'
    }],
    store: sales
});
