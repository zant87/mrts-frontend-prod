import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "/api/",
});

export const BudgetLevelsAPI = {
  getInds() {
    return instance.get(`indicators?isCalc.equals=1&actual.equals=true`).then((response) => {
      return response.data;
    });
  },
  getBudgetLevelsData(indId = null, fundingId = null, scenario = null, yearStart = 2016, yearEnd = 2020) {
    //debugger;
    //views/indicator-budget-and-levels?fundingSourceId.equals=3&indicatorId.equals=1045&scenarioId.equals=5&year.greaterThanOrEqual=2016&year.lessThanOrEqual=2020

    let url = null;

    // indIds.forEach((item, index) => {
    //   if (item == null) {
    //     indsUrl = "";
    //   }
    //   indsUrl += `&indicatorId.in=${item}`;
    // });

    //url = "views/actual-indicator-levels?frequencyId.equals=" + frequencyId + "&scenarioId.equals=" + scenario + "&year.equals=" + year + indsUrl;
    url =
      "views/indicator-budget-and-levels?fundingSourceId.equals=" +
      fundingId +
      "&indicatorId.equals=" +
      indId +
      "&scenarioId.equals=" +
      scenario +
      "&year.greaterThanOrEqual=" +
      yearStart +
      "&year.lessThanOrEqual=" +
      yearEnd;

    console.log(url);

    return instance.get(url).then((response) => {
      if (response.data.length == 0) {
        return null;
      }

      return response.data;
    });
  },
  getGoals() {
    return instance.get("goals?transportStrategyVersionActual.equals=true").then((response) => {
      return response.data;
    });
  },
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
  getYears() {
    return instance.get("nsi-years").then((response) => {
      return response.data;
    });
  },
  getScenarios() {
    return instance.get("scenarios?code.In=BASE&code.In=INNOVATIVE").then((response) => {
      return response.data;
    });
  },
  getFundings() {
    return instance.get("nsi-fundings").then((response) => {
      return response.data;
    });
  },
};
