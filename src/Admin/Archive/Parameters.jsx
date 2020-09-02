import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import Highlighter from "react-highlight-words";

export default class AdminArchiveParametersPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'year', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true},
            {field: 'okudName', title: 'ОКУД', filtering: true},
            {field: 'parameterName', title: 'Показатель', filtering: true},
            {
                field: 'transportTypeName', title: 'Вид транспорта', filtering: true, render: rowData => {
                    console.log(rowData);
                    return <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={["транспорте"]}
                        autoEscape={false}
                        textToHighlight={rowData.parameterName}
                    />
                }
            },
            {field: 'dataProviderCode', title: 'Источник', filtering: true},
            {field: 'value', title: 'Значение показателя', filtering: false},
            {field: 'beginDate', title: 'Дата изменения записи', filtering: true, type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия записи', filtering: false, type: 'date'},
            {field: 'okeiName', title: 'Единица измерений'},
        ];

        const filtersList = {
            'year': 'equals'
        };

        const actions = [
            {
                icon: 'highlight',
                tooltip: 'Подсветка',
                onClick: (rowData) => {
                    console.log('You clicked Highlight button =', rowData);
                },
                isFreeAction: true
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Архив показателей для расчета индикаторов ТС'}
                    baseUrl={'views/i-1-s'}
                    actions={actions}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
