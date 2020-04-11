import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "/api/",
});

export const ParamsAPI = {

  getParams() {
    return instance.get(`form-params`).then((response) => {
      return response.data;
    });
  },
  getParamData(paramId, frequencyId = 1, yearStart = "", yearEnd = "") {
    return instance
      .get(
        `views/actual-params?formParameterId.equals=${paramId}&frequencyId.equals=${frequencyId}&parameterDate.greaterThanOrEqual=${yearStart}&parameterDate.lessThanOrEqual=${yearEnd}`
      )
      .then((response) => {
        if (response.data.length == 0) {
          return null;
        }
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
