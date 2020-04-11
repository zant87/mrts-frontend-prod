import actions from './ReportsActions';

const initialState = {
    rows: [],
    reportType: 'PDF',
    startYear: 2015,
    endYear: 2018,
    label: true,
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    if (type === actions.FETCH_STARTED) {
        return {
            ...state,
            loading: true,
        };
    }

    if (type === actions.FETCH_SUCCESS) {
        return {
            ...state,
            loading: false,
            rows: payload.rows
        };
    }

    if (type === actions.FETCH_ERROR) {
        return {
            ...state,
            loading: false,
            rows: [],
        };
    }

    return state;
}


