import * as axios from "axios";

const instance = axios.create({
  baseURL: "/api/",
});

export const ArchiveAPI = {

	getParameterData(transportTypeId = '', dataProviderId = '', okudId = '', parameterId = '', year = '', quarterId = '') {

        let url = `/views/i-1-s?transportTypeId.equals=` + transportTypeId + 
                                          `&dataProviderId.equals=` + dataProviderId + 
                                          `&okudId.equals=` + okudId +
                                          `&parameterId.equals=` + parameterId +
                                          `&year.equals=` + year +
                                          `&quarterId.equals=` + quarterId;
        console.log(url);
	    return instance.get(url).then((response) => {
	      if (response.data.length == 0) {
	        return null;
	      }

	      return response.data;
	    });
	}

}