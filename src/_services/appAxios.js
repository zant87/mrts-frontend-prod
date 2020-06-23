import Axios from 'axios';

// const CancelToken = Axios.CancelToken;
// export let cancel;

const appAxios = Axios.create({
    baseURL: "/api/",
    // cancelToken: new CancelToken(function (c) {
    //     cancel = c;
    // }),
});

export default appAxios;
