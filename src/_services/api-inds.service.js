import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "http://localhost:3000/api/",
});

export const IndsAPI = {
  getInds() {
    return instance.get(`indicators`).then((response) => {
      return response.data;
    });
  },
  getIndData(indId, frequencyId = 1, yearStart = "", yearEnd = "") {
    return instance
      .get(
        `views/actual-indicators?indicatorId.equals=${indId}&frequencyId.equals=${frequencyId}&indicatorDate.greaterThanOrEqual=${yearStart}&indicatorDate.lessThanOrEqual=${yearEnd}`
      )
      .then((response) => {
        if (response.data.length == 0) {
          return null;
        }

        return response.data;
      });
  },
  getGoals() {
    return instance.get("goals?transportStrategyVersionId.equals=3").then((response) => {
      return response.data;
    });
  },
  getGoal() {
    return instance.get("goals?transportStrategyVersionId.equals=3").then((response) => {
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
};
