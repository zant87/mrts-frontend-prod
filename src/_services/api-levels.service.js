import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "/api/",
});

export const LevelsAPI = {
  getInds() {
    return instance.get(`indicators?isCalc.equals=1`).then((response) => {
      return response.data;
    });
  },
  getLevelsData(
    indIds = [],
    frequencyId = 1,
    scenario = null,
    year = 2010,
    quarter = null
  ) {
    //debugger;
    let indsUrl = "";
    let url = null;
    indIds.forEach((item, index) => {
      if (item == null) {
        indsUrl = "";
      }
      indsUrl += `&indicatorId.in=${item}`;
    });
    //let quarter = quarter;
    if (quarter == null) {
      url =
        "views/actual-indicator-levels?frequencyId.equals=" +
        frequencyId +
        "&scenarioId.equals=" +
        scenario +
        "&year.equals=" +
        year +
        indsUrl;
    } else {
      url =
        "views/actual-indicator-levels?frequencyId.equals=" +
        frequencyId +
        "&scenarioId.equals=" +
        scenario +
        "&year.equals=" +
        year +
        "&quarterId.equals=" +
        quarter +
        indsUrl;
    }

    console.log(url);
    return instance.get(url).then((response) => {
      if (response.data.length == 0) {
        return null;
      }

      return response.data;
    });
  },
  getGoals() {
    return instance
      .get("goals?transportStrategyVersionActual.equals=true")
      .then((response) => {
        return response.data;
      });
  },
  getGoal() {
    return instance
      .get("goals?transportStrategyVersionActual.equals=true")
      .then((response) => {
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
  getScenarios() {
    return instance
      .get("scenarios?code.In=BASE&code.In=INNOVATIVE")
      .then((response) => {
        return response.data;
      });
  },
};
