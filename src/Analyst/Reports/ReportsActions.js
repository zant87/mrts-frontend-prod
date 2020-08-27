import ReportService from "./ReportsService";

const prefix = 'ANALYST_REPORTS';

const actions = {

    FETCH_STARTED: `${prefix}_FETCH_STARTED`,
    FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
    FETCH_ERROR: `${prefix}_FETCH_ERROR`,

    doFetch: () => (dispatch) => {
        try {
            dispatch({
                type: actions.FETCH_STARTED,
                payload: {},
            });

            const response = ReportService.list();

            dispatch({
                type: actions.FETCH_SUCCESS,
                payload: {
                    rows: response,
                },
            });

        } catch (error) {
            console.log("Error while fetching reportsList list: " + error);
            dispatch({
                type: actions.FETCH_ERROR,
            });
        }
    },
};

export default actions;

