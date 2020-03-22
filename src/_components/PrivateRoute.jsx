import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {authenticationService} from '@/_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // если не авторизован, то редирект на /login с запоминанием откуда был редирект
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
            return <Redirect to={{ pathname: '/'}} />
        }

        // если авторизован, то возвращает компонент
        return <Component {...props} />
    }} />
);
