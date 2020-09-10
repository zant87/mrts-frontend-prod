import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "/api/",
});


export const IndsAPI = {
  getInds() {
    return instance.get(`indicators?isCalc.equals=1`).then((response) => {
      return response.data;
    });
  },

  getIndData(indId, frequencyId = 1, yearStart = "", yearEnd = "", quarterId = null) {
    let url;
    if (quarterId == null) {
      url =
        "views/actual-indicators?indicatorId.equals=" +
        indId +
        "&frequencyId.equals=" +
        frequencyId +
        "&year.greaterThanOrEqual=" +
        yearStart +
        "&year.lessThanOrEqual=" +
        yearEnd;
    } else {
      url =
        "views/actual-indicators?indicatorId.equals=" +
        indId +
        "&frequencyId.equals=" +
        frequencyId +
        "&year.greaterThanOrEqual=" +
        yearStart +
        "&year.lessThanOrEqual=" +
        yearEnd +
        "&quarterId.equals=" +
        quarterId;
    }
    console.log(url);
    return instance.get(url).then((response) => {
      if (response.data.length == 0) {
        return null;
      }

      return response.data;
    });
  },

  getIndDataScheme(year) {
    let url = "views/actual-indicators?valueTypeCode.equals=FACT&frequencyId.equals=1&year.equals=" + year;
    console.log(url);
    return instance.get(url).then((response) => {
      if (response.data.length == 0) {
        return null;
      }
      return response.data;
    });
  },
  // goals?transportStrategyVersionId.equals=3
  getGoals() {
    return instance.get("goals?transportStrategyVersionActual.equals=true").then((response) => {
      return response.data;
    });
  },
  // getGoal() {
  //   return instance.get("goals?transportStrategyVersionActual.equals=true").then((response) => {
  //     return response.data;
  //   });
  // },
  getGoal() {
    return instance.get("goals?transportStrategyVersionActual.equals=true").then((response) => {
      return response.data;
    });
  },
  getTransportTypes() {
    return instance.get("nsi-transport-types").then((response) => {
      return response.data;
    });
  },
  getfrequencies() {
    return instance.get("frequencies").then((response) => {
      return response.data;
    });
  },
  getYears() {
    return instance.get("nsi-years").then((response) => {
      return response.data;
    });
  },
  getQuarters() {
    return instance.get("nsi-quarters").then((response) => {
      return response.data;
    });
  },
};
