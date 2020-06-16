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
                        <h1 className='text-center'>Плановые показатели</h1>
                        <ul className='list-unstyled example-components-list mt-5'>
                            <NavLink to='/operator/plan/indicators' title='Индикаторы ТС'/>
                            <NavLink to='/operator/plan/activities' title='Мероприятия по реализации ТС'/>
                            <NavLink to='/operator/plan/projects' title='Крупные инвестиционные проекты'/>
                            <NavLink to='/operator/plan/resources' title='Ресурсное обеспечение ТС'/>
                        </ul>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Navigation;
