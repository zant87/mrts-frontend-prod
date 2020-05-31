import {BehaviorSubject} from 'rxjs';

import config from 'config';
import {handleResponse} from '@/_helpers';
import appAxios from "./appAxios";
import { Base64 } from 'js-base64';
import cookie from 'react-cookies'

const currentUserSubject = new BehaviorSubject(JSON.parse(Base64.decode(cookie.load('UserInfo'))));
const currentUserRole = new BehaviorSubject(JSON.parse(Base64.decode(cookie.load('UserRole'))));

/*

            const data = {
                id: req.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                name: req.user['http://schemas.xmlsoap.org/claims/CommonName'],
                surname: req.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
                roles: req.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                email: req.user.email
            };

 */

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    currentUserRole: currentUserRole.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get currentUserRoleValue () { return currentUserRole.value },
};

function login(username, password) {

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };
    //
    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // сохраняем данные о юзере и jwt токен в локальное хранилище
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         currentUserSubject.next(user);
    //         return user;
    //     });

}

function logout() {
    // appAxios.get('logout').then(res => console.log(res.data));
    // удаляем данные о юзере из локального хранилища при выходе
    // localStorage.removeItem('currentUser');
    // currentUserSubject.next(null);
}
