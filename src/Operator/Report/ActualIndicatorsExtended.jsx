import React from 'react';
import {toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";
import TableContainer from "../../Containers/TableContainer";

export default class OperatorActualIndicatorsExtendedPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false
    };

    render() {

        const editable = {
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        appAxios({
                            url: `/views/actual-indicator-ext`,
                            method: 'PUT',
                            data: newData
                        }).then((response) => {
                            const message = response.headers["x-mrts-backend-params"];
                            toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                                closeButton: false
                            });
                        });

                        resolve();
                    }, 1000)
                }),
        }

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'indicatorCodeShort', title: 'Код', filtering: true, editable: 'never'},
            {field: 'indicatorName', title: 'Наименование', filtering: true, editable: 'never'},
            {field: 'scenarioName', title: 'Сценарий', filtering: true, editable: 'never'},
            {field: 'okeiName', title: 'Единица измерения', filtering: true, editable: 'never'},
            {field: 'valueTypeName', title: 'Тип значения', filtering: true, editable: 'never'},
            {field: 'year', title: 'Год', filtering: true, editable: 'never'},
            {field: 'quarterName', title: 'Квартал', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', filtering: true, editable: 'never'},
            {field: 'username', title: 'Пользователь', filtering: true, editable: 'never'},
            {field: 'calcScript', title: 'Результаты расчета', filtering: true, editable: 'never'},
            {field: 'indicatorValue', title: 'Значение', type: 'numeric', editable: 'always'},
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Индикаторы за отчетный период'}
                    baseUrl={'views/actual-indicator-ext'}
                    filterMinimalLength={2}
                    editable={editable}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
}
