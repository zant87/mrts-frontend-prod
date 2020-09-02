import React from "react";
import {MDBBtn, MDBInput, toast, MDBScrollbar, MDBContainer} from "mdbreact";
import '../../scrollbar.css';

const HighlighModal = (props) => {

    return (
        <MDBContainer>
            <div className="scrollbar my-1 mx-auto" style={{minHeight: '200px', maxHeight: '600px'}}>
                <MDBInput label="Текст для подсветки" name='highlight' value={props.highlight} onChange={props.onChange}
                          outline={true} type="text"/>
                <MDBBtn color="primary" type="none" onClick={props.doHighligh}>
                    Выделить
                </MDBBtn>
            </div>
        </MDBContainer>
    );

}

export default HighlighModal;
