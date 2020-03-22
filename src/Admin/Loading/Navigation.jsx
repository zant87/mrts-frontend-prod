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
                            <h1 className='text-center'>Загрузка</h1>
                            <h5 className='mt-4 grey-text'>
                                <strong className='indigo-text'>Загрузка из АС</strong>
                            </h5>
                            <ul className='list-unstyled example-components-list mt-4'>
                                <NavLink to='/admin/loading/fromEMISS' title='Загрузка из ЕМИСС' />
                                <NavLink to='/admin/loading/fromMDD' title='Загрузка из ФЗ Мониторинг Дорожных Фондов'/>
                                <NavLink to='/admin/loading/fromMSTK' title='Загрузка из ФЗ МСТК'/>
                            </ul>
                            <h5 className='mt-5 grey-text'>
                                <strong className='indigo-text'>Загрузка из файлов</strong>
                            </h5>
                            <ul className='list-unstyled example-components-list mt-4'>
                                <NavLink to='/admin/loading/fromSDMX' title='Загрузка из SDMX'/>
                                <NavLink to='/admin/loading/fromXLSX' title='Загрузка из XLSX'/>
                                <NavLink to='/admin/loading/fromCSV'  title='Загрузка из CSV' />
                            </ul>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default Navigation;
