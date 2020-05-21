import React from "react";
import { MDBCol, MDBIcon, MDBSelect } from "mdbreact";
import Preloader from "@/Common/Preloader/Preloader";
import { Fragment } from "react";

const ParamsSettings = (props) => {
  if (!props.transportTypes) {
    return <Preloader />;
  }

  let transportTypes = null;

  if (props.transportTypes) {
    transportTypes = props.transportTypes.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  let onSelectTransportType = (e) => {
    let transportTypeID = e.target.value;
    props.setTransportTypeId(transportTypeID);
  };

  let onSearchQueryChange = (e) => {
    let searchQuery = e.target.value;
    props.setSearchQuery(searchQuery);
  };

  return (
    <Fragment>
      {/* <MDBSelect multiple options={options} selected="Choose your option" selectAll outline /> */}

      <div style={{ marginBottom: "20px" }}>
        <select onChange={onSelectTransportType} className="browser-default custom-select custom-select-sm">
          <option value="0">Все виды транспорта</option>
          {props.transportTypes
            ? transportTypes.map((item) =>
                item.id == props.transportTypeId ? (
                  <option value={item.id} selected>
                    {item.name}
                  </option>
                ) : (
                  <option value={item.id}>{item.name}</option>
                )
              )
            : null}
        </select>
      </div>
      <hr />

      <div style={{ marginBottom: "20px" }}>
        <MDBCol md="50">
          <form className="form-inline mt-4 mb-4">
            <MDBIcon icon="search" />
            <input
              onChange={onSearchQueryChange}
              value={props.searchQuery}
              className="form-control form-control-sm  ml-3 w-75"
              type="text"
              placeholder="Поиск показателей"
              aria-label="Search"
            />
          </form>
        </MDBCol>
      </div>
    </Fragment>
  );
};

export default ParamsSettings;
