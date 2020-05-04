import React from "react";
import {MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ru';

export default class OperatorReportActivitiesUpdatePage extends React.Component {

/*
@RequestParam("pID") Long pID,
@RequestParam("pDoc") Long pDoc,
@RequestParam("pRptDescription") String pRptDescription){
 */

    state = {
        id: 0,
        document: 0,
        description: "",
        isLoading: false
    };



}
