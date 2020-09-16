import {BehaviorSubject} from 'rxjs';
import {Base64} from 'js-base64';
import cookie from 'react-cookies'
import {Role} from "../_helpers";
import {history} from "@/_helpers";
import config from 'config';
import appAxios from "./appAxios";
import moment from "moment";

if (!config.isLocalDeployment) {
    console.log('Production Mode Is Off');
} else {
    console.log('Development Mode Is On');

    const data = {
        id: 'userid',
        name: 'Администратор',
        surname: 'МРТС',
        fullname: 'Адмиристратор МРТС',
        roles: 'mrts-admins',
        email: 'email@email.com',
    };

    let cookies = cookie.select(/ser/g);
    console.log(cookies);

    if (Object.entries(cookies).length === 0) {
        console.log('Setting Development Mode Cookies');
        cookie.save('UserInfo', Base64.encode(JSON.stringify(data)));
        cookie.save('UserRole', Base64.encode(JSON.stringify({role: 'mrts-admins'})));
    }
}

let currentUserSubject;
let currentUserRole;

if (document.cookie.indexOf('UserInfo') !== -1 && document.cookie.indexOf('UserRole') !== -1) {
    console.log('parsing cookies...');
    currentUserSubject = new BehaviorSubject(JSON.parse(Base64.decode(cookie.load('UserInfo'))));
    currentUserRole = new BehaviorSubject(JSON.parse(Base64.decode(cookie.load('UserRole'))));
} else {
    window.location.replace('https://int.asutk.ru/');
}

export const authenticationService = {
    login,
    logout,
    setRole,
    logUser,
    currentUser: currentUserSubject.asObservable(),
    currentUserRole: currentUserRole.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    },
    get currentUserRoleValue() {
        return currentUserRole.value
    },
};


function logUser(user) {

    const newUser = {...user, username: user.id};
    delete newUser.id;
    console.log('newUser =', newUser);

    appAxios.get(`users?username.equals=${user.id}`)
        .then(response => {
            const res = response.data[0];
            console.log('Get returned User =', res);
            console.log('Type of returned User =', typeof res);
            console.log('Check user === undefined', res === undefined);
            if (res === undefined) {
                console.log(`User ${user.fullname} not found`);
                appAxios({
                    url: `users`,
                    method: 'POST',
                    data: newUser
                }).then((response) => {
                    console.log(`User ${user.fullname} created with found id = ${response.data.id}`);
                });
            } else {
                console.log(`User ${res.fullname} found`);
            }

            newUser.lastLogin = moment().format('YYYY-MM-DDThh:mm:ss');

            console.log('Posting user into Audit Log', newUser);

            appAxios({
                url: `audit-logs`,
                method: 'POST',
                data: newUser
            }).then((response) => {
                console.log(`User info posted to Audit Log`);
            });

            console.log(`Finishing auth`);
        })
}

function setRole(role) {
    console.log('Switching Role to ', role);
    let data;

    cookie.remove('UserInfo');
    cookie.remove('UserRole');

    switch (role) {
        case Role.Admin:

            data = {
                id: 'userid_admin',
                name: 'Администратор',
                surname: 'МРТС',
                fullname: 'Адмиристратор МРТС',
                roles: 'mrts-admins',
                email: 'email@email.com',
            };

            cookie.save('UserInfo', Base64.encode( JSON.stringify(data)));
            cookie.save('UserRole', Base64.encode(JSON.stringify({role: Role.Admin})));
            history.push(`/`);
            window.location.reload();
            break;
        case Role.Analyst:

            data = {
                id: 'userid_analyst',
                name: 'Аналитик',
                surname: 'МРТС',
                fullname: 'Аналитик МРТС',
                roles: 'mrts-analysts',
                email: 'email@email.com',
            };

            cookie.save('UserInfo', Base64.encode( JSON.stringify(data)));
            cookie.save('UserRole', Base64.encode(JSON.stringify({role: Role.Analyst})));
            history.push(`/`);
            window.location.reload();
            break;
        case Role.Operator:

            data = {
                id: 'userid_operator',
                name: 'Оператор',
                surname: 'МРТС',
                fullname: 'Оператор МРТС',
                roles: 'mrts-operators',
                email: 'email@email.com',
            };

            cookie.save('UserInfo', Base64.encode( JSON.stringify(data)));
            cookie.save('UserRole', Base64.encode(JSON.stringify({role: Role.Operator})));
            history.push(`/`);
            window.location.reload();
            break;
        default:
            console.log('No Role Defined');
    }
}

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
