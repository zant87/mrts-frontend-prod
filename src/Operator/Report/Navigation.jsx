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
                        <h1 className='text-center'>Отчетные показатели</h1>
                        <ul className='list-unstyled example-components-list mt-5'>
                            <NavLink to='/operator/report/fact' title='Фактические значения показателей' />
                            <NavLink to='/operator/report/activities' title='Выполнение мероприятий по реализации ТС' />
                            <NavLink to='/operator/report/projects_master' title='Выполнение крупных инвестиционных проектов (master)' />
                            <NavLink to='/operator/report/projects_detail' title='Финансирование проектов ТС (detail)' />
                            <NavLink to='/operator/report/financing' title='Бюджетное финансирование транспорта' />
                            <NavLink to='/operator/report/appropriations' title='Бюджетные ассигнования в рамках программ развития транспорта' />
                            <NavLink to='/operator/report/extrabudget' title=' Объемы привлечения внебюджетных средств' />
                            <NavLink to='/operator/report/sources' title='Источники финансирования транспорта организациями' />
                        </ul>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Navigation;
