import React from 'react';
import { MDBIcon, MDBNavLink } from 'mdbreact';

export const NavLink = ({ to, title }) => {
    return (
        <MDBNavLink className='list-group-item list-group-item-action' to={to} >
            <h5 style={{ margin: '0' }} className='justify-content-between d-flex align-items-center'>
                {title}
                <MDBIcon icon='angle-right' />
            </h5>
        </MDBNavLink>
    );
};
