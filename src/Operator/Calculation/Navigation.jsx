import React from 'react';
import {NavLink}  from '@/_components/NavLink';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBJumbotron,
} from 'mdbreact';

const Navigation = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md='10' className='my-3 mx-auto'>
                    <MDBJumbotron>
                        <h1 className='text-center'>Контроль</h1>
                        <ul className='list-unstyled example-components-list mt-5'>
                            <NavLink to='/operator/calculation/intermediate'
                                     title='Расчет промежуточных значений индикаторов'/>
                            <NavLink to='/operator/calculation/values'
                                     title='Расчет значений индикаторов за отчетный период'/>
                            <NavLink to='/operator/calculation/levels'
                                     title='Расчет уровней и динамики достижения индикаторов'/>
                        </ul>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Navigation;
