import {createSelector} from 'reselect';

const selectRaw = (state) => state.reports.list;

const selectLoading = createSelector(
    [selectRaw],
    (raw) => raw.loading,
);

const selectRows = createSelector(
    [selectRaw],
    (raw) => raw.rows,
);

export default {
    selectLoading,
    selectRows,
};
