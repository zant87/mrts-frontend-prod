import React from 'react';
import {NavLink} from '@/_components/NavLink';
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
                        <h1 className='text-center'>Архив</h1>
                        <ul className='list-unstyled example-components-list mt-5'>
                            <NavLink to='/admin/archive/parameters'
                                     title='Архив показателей для расчета индикаторов ТС'/>
                            <NavLink to='/admin/archive/indicators' title='Архив расчета индикаторов ТС'/>
                            <NavLink to='/admin/archive/activities'
                                     title='Архив выполнения мероприятий по реализации ТС'/>
                            <NavLink to='/admin/archive/projects'
                                     title='Архив выполнения крупных инвестиционных проектов'/>
                        </ul>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Navigation;
