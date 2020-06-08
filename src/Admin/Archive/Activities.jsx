import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
import TableContainer from "./common/TableContainer";




/* TODO:
http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-1-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-2-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-3-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-4-resource

количество записей передаётся в хедере x-total-count
для всех представлений есть метод all
как работают критерии можешь посмотреть в Аналитике

ну либо в swagger
*/

const AdminArchiveActivitiesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Архив выполнения мероприятий по реализации ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Архив выполнения мероприятий по реализации ТС </h1>
            </MDBRow>
            <MDBRow>


            </MDBRow>
        </MDBContainer>
    );
};

export default AdminArchiveActivitiesPage;
