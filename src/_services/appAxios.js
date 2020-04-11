import Axios from 'axios';

const appAxios = Axios.create({
    baseURL: "/api/",
});

// appAxios.interceptors.request.use(
//     async function(options) {
//         const token = await AuthToken.get();
//
//         if (token) {
//             options.headers['Authorization'] = `Bearer ${token}`;
//         }
//
//         return options;
//     },
//     function(error) {
//         console.log('Request error: ', error);
//         return Promise.reject(error);
//     },
// );

export default appAxios;
