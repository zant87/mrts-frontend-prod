import React from 'react';
import {toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";
import NumericFilter from "../../Common/Filters/NumericFilter";

export default class AdminStructureTransportStrategiesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
        filtersList: {
            id: {
                type: "numeric",
                operator: "=",
                value: null
            },
        }
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/transport-strategy-versions`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    updateFilter = (e) => {

        console.log('Update Filter received =', e);

        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};

        console.log('New Filter =', newFilter);

        this.setState({filtersList: newFilter});

    }

    render() {

        console.log(this.state);

        const tableRef = React.createRef();
        const {data, page, count, isLoading} = this.state;

        const columns = [
            {
                field: 'id', title: '#', editable: 'never',
                defaultFilter: this.state.filtersList['id'].value,
                filterComponent: props => {
                    console.log(`Column ${props.columnDef.field} props =`, props);
                    return <NumericFilter id={props.columnDef.field}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          changed={this.updateFilter}
                    />;
                }
            },
            {field: 'code', title: 'Код', filtering: true, editable: 'never'},
            {field: 'name', title: 'Наименование', filtering: true, editable: 'never'},
            {field: 'description', title: 'Описание', filtering: true, editable: 'never'},
            {field: 'documentBase', title: 'Основание', filtering: true, editable: 'never'},
            {
                field: 'actual',
                title: 'Актуальность',
                filtering: true,
                editable: 'onUpdate',
                lookup: {true: 'Да', false: 'Нет'}
            },
        ];

        return (
            <React.Fragment>
                <MaterialTable
                    title="Версии транспортной стратегии"
                    columns={columns}
                    tableRef={tableRef}
                    isLoading={isLoading}
                    localization={ruLocalization}
                    data={data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log(newData);
                                    const dataUpdate = [...data];
                                    const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                    dataUpdate[index] = newData;
                                    this.setState({data: dataUpdate});

                                    appAxios({
                                        url: `transport-strategy-versions`,
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
                    }}
                    options={{
                        actionsColumnIndex: 999,
                        search: false,
                        pageSize: 20,
                        pageSizeOptions: [20, 50, 100],
                        filtering: true
                    }}
                />
            </React.Fragment>
        )
    }
}
