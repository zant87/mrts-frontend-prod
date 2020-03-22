import {authenticationService} from '@/_services';

export function authHeader() {
    // возвращаем header с токеном jwt
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
