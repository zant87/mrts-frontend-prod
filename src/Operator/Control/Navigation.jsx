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
                <MDBCol md='10' className='mt-5 mx-auto'>
                    <MDBJumbotron>
                        <h1 className='text-center'>Контроль</h1>
                        <ul className='list-unstyled example-components-list mt-5'>
                            <NavLink to='/operator/control/indicators' title='Контроль поступления и согласования данных по показателям для расчета индикаторов ТС' />
                            <NavLink to='/operator/control/completion' title='Контроль выполнения и согласования расчета индикаторов ТС' />
                            <NavLink to='/operator/control/activities' title='Контроль поступления и согласования данных по выполнению мероприятий по реализации ТС' />
                            <NavLink to='/operator/control/projects' title='Контроль поступления и согласования данных по выполнению крупных инвестиционных проектов' />
                            <NavLink to='/operator/control/resources' title='Контроль поступления и согласования данных по выполнению ресурсного обеспечения' />
                        </ul>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Navigation;
