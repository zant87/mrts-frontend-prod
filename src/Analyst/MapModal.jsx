import React from "react";
import {MDBBtn, MDBInput, toast, MDBScrollbar, MDBContainer} from "mdbreact";
import '../scrollbar.css';

const MapModal = (props) => {

    let inputs = <MDBInput label="Конкретный год" name='start' value={props.start} onChange={props.onChange}
                           outline={true} type="number"/>;
    if (props.action === 'enter-period')
        inputs = <React.Fragment>
            <MDBInput label="Начало интервала" name='start' value={props.start} onChange={props.onChange} outline={true}
                      type="number"/>
            <MDBInput label="Конец интервала" name='end' value={props.end} onChange={props.onChange} outline={true}
                      type="number"/>
        </React.Fragment>;

    return (
        <MDBContainer>
            <div className="scrollbar my-1 mx-auto" style={{minHeight: '200px', maxHeight: '600px'}}>
                {inputs}
                <MDBBtn color="primary" type="none" onClick={props.doFilterLayers}>
                    Фильтровать
                </MDBBtn>
            </div>
        </MDBContainer>
    );

}

export default MapModal;
