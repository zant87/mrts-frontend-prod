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
                                <strong className='indigo-text'>Инициализация бланков</strong>
                            </h5>
                            <ul className='list-unstyled example-components-list mt-4'>
                                <NavLink to='/admin/loading/reports' title='Бланки отчетов исполнителей' />
                            </ul>
                            <h5 className='mt-4 grey-text'>
                                <strong className='indigo-text'>Загрузка из АС</strong>
                            </h5>
                            <ul className='list-unstyled example-components-list mt-4'>
                                <NavLink to='/admin/loading/fromEMISS' title='Синхронизация с ЕМИСС'/>
                                <NavLink to='/admin/loading/fromMDD' title='Синхронизация с ФЗ МДД'/>
                                <NavLink to='/admin/loading/fromMSTK' title='Синхронизация с ФЗ МСТК'/>
                                <NavLink to='/admin/loading/fromGIBDD' title='Синхронизация с ГИБДД'/>
                            </ul>
                            <h5 className='mt-5 grey-text'>
                                <strong className='indigo-text'>Загрузка из файлов</strong>
                            </h5>
                            <ul className='list-unstyled example-components-list mt-4'>
                                {/*<NavLink to='/admin/loading/fromSDMX' title='Загрузка из SDMX'/>*/}
                                <NavLink to='/admin/loading/fromXLSX' title='Загрузка из XLSX'/>
                                {/*<NavLink to='/admin/loading/fromCSV'  title='Загрузка из CSV' />*/}
                            </ul>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default Navigation;
