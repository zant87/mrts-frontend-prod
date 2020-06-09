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
                    <MDBCol md='10' className='my-2 mx-auto'>
                        <MDBJumbotron>
                            <h1 className='text-center'>
                                Настройка структуры
                            </h1>
                            <ul className='list-unstyled example-components-list mt-5'>
                                <NavLink to='/admin/structure/indicators' title='Индикаторы по целям ТС'/>
                                <NavLink to='/admin/structure/goals' title='Дерево целей и задач'/>
                                <NavLink to='/admin/structure/params' title=' Показатели для расчета индикаторов ТС'/>
                            </ul>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default Navigation;
