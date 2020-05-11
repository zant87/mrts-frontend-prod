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
                    <MDBCol md='10' className='mt-5 mx-auto'>
                        <MDBJumbotron>
                            <h1 className='text-center'>Настройка контроля</h1>
                            <ul className='list-unstyled example-components-list mt-5'>
                                <NavLink to='/admin/control/executors' title='Реестр исполнителей процессов' />
                                <NavLink to='/admin/control/executorsByIndicator' title='Исполнители по индикаторам' />
                                <NavLink to='/admin/control/executorsByParameters' title='Исполнители по показателям' />
                                <NavLink to='/admin/control/executorsByActivities' title='Исполнители по мероприятиям по реализации' />
                                <NavLink to='/admin/control/executorsByProjects' title='Исполнители по крупным инвестиционным проектам' />
                                <NavLink to='/admin/control/executorsByResource' title='Исполнители по ресурсному обеспечению' />
                            </ul>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default Navigation;
