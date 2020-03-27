import React from 'react';
import MUIDataTable from "mui-datatables";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import CustomToolbarSelect from "@/_components/CustomToolbarSelect";
import CustomToolbar from "@/_components/CustomToolbar";

const OperatorControlActivitiesPage = () => {

    const columns = ["Имя", "Компания", "Город", "Штат", "Имя1", "Компания1", "Город1", "Штат1", "Имя2", "Компания2", "Город2", "Штат2",
        {
            name: "Редактирование",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                console.log('Удаление');
                            }}>Удалить</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                                console.log('Редактирование');
                            }}>Редактировать</button>
                            {/*<button type="button" className="btn btn-unique btn-sm">Right</button>*/}
                        </div>
                        // <button className="btn btn-primary btn-sm" onClick={() => {
                        //     const { data } = this.state;
                        //     data.shift();
                        //     this.setState({ data });
                        // }}>
                        //     Редактировать
                        // </button>
                    );
                }
            }
        },
        // {
        //     name: "Удалить",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <button className="btn btn-danger btn-sm"   onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
        //                     Удалить
        //                 </button>
        //             );
        //         }
        //     }
        // },
    ];

    const data = [
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Иван", "Test Corp", "Yonkers", "NY", "Иван", "Test Corp", "Yonkers", "NY"]
    ];

    const options = {
        textLabels: {
            body: {
                noMatch: "Ничего не найдено",
                toolTip: "Сортировка",
                columnHeaderTooltip: column => `Сортировка для ${column.label}`
            },
            pagination: {
                next: "Следующая страница",
                previous: "Предыдущая страница",
                rowsPerPage: "Строк на страницу:",
                displayRows: "из",
            },
            toolbar: {
                search: "Поиск",
                downloadCsv: "Скачать CSV",
                print: "Печать",
                viewColumns: "Столбцы",
                filterTable: "Фильтры",
            },
            filter: {
                all: "Все",
                title: "Фильтры",
                reset: "Сброс",
            },
            viewColumns: {
                title: "Показать столбцы",
                titleAria: "Показать/Спрятать столбцы",
            },
            selectedRows: {
                text: "строк выбрано",
                delete: "Удалить",
                deleteAria: "Удалить выбранную(ые) строки",
            },
        },
        sortFilterList: false,
        print: false,
        selectableRowsOnClick: true,
        selectableRows: 'none',
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
        ),
        customToolbar: () => {
            return (
                <CustomToolbar />
            );
        },
        filterType: 'textField',
        onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
        onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
        onChangePage: currentPage => console.log('currentPage: ', currentPage)
    };

    return (
        <MDBContainer fluid>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Контроль поступления и согласования данных по выполнению мероприятий по реализации ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow className='ml-2 my-2'>
                <h1>Контроль поступления и согласования данных по выполнению мероприятий по реализации ТС</h1>
            </MDBRow>

            <MDBRow center>
                <MDBCol md={'12'} className='mb-5 mx-auto'>
                    <MUIDataTable
                        title={"Employee List"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorControlActivitiesPage;
