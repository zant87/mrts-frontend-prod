import * as axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // crossdomain: true,
  baseURL: "/api/",
});

export const ParamsAPI = {
  getParams(checkedFormsId) {
    let formsUrl = "";
    let url = null;
    if (checkedFormsId != null) {
      checkedFormsId.forEach((item, index) => {
        if (item == null) {
          formsUrl = "";
        }
        formsUrl += `&formId.in=${item}`;
      });
    }
    url = "form-params?" + formsUrl;
    console.log(url);
    return instance.get(url).then((response) => {
      return response.data;
    });
  },
  getParamData(paramId, frequencyId = 1, yearStart = "", yearEnd = "", quarter = null) {
    let url;

    if (quarter == null) {
      url =
        "views/actual-params?formParameterId.equals=" +
        paramId +
        "&frequencyId.equals=" +
        frequencyId +
        "&year.greaterThanOrEqual=" +
        yearStart +
        "&year.lessThanOrEqual=" +
        yearEnd;
    } else {
      url =
        "views/actual-params?formParameterId.equals=" +
        paramId +
        "&frequencyId.equals=" +
        frequencyId +
        "&year.greaterThanOrEqual=" +
        yearStart +
        "&year.lessThanOrEqual=" +
        yearEnd +
        "&quarterId.equals=" +
        quarter;
    }
    console.log(url);

    return instance.get(url).then((response) => {
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
  getForms() {
    return instance.get("forms").then((response) => {
      return response.data;
    });
  },
};
