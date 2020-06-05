import React from 'react';
import { MDBContainer, MDBSpinner, MDBRow, MDBCol } from "mdbreact";
import PivotGrid, {FieldChooser, Export, FieldPanel } from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const PivotContainer = (props) => { 
    return (
            <MDBContainer fluid>
                       <MDBRow center>
                          <MDBCol md={'12'} className='my-1 mx-auto'>
                            <div className="desc-container my-3 mx-auto"><h5><b>&nbsp;&nbsp;&nbsp;{props.title}</b></h5></div>
                            {props.isPLoading && <MDBSpinner multicolor />}
                            <PivotGrid id="factPivot"
                              dataSource={new PivotGridDataSource({ fields: props.pFields, store: props.pData })}
                              allowSortingBySummary={true}
                              allowFiltering={true}                              
                              allowSorting={true}
                              allowExpandAll={true}
                              height={780}
                              className='card mx-auto'
                              showBorders={true}
                              showColumnTotals={false}
                              showColumnGrandTotals={false}
                              showRowTotals={false}
                              showRowGrandTotals={false} >
                              <FieldPanel showColumnFields={true} />
                              <FieldChooser enabled={true} />
                              <Export enabled={true} fileName={props.title} allowExportSelectedData={true} />
                            </PivotGrid>
                         </MDBCol>
                       </MDBRow>
            </MDBContainer>); 
};

export default PivotContainer;