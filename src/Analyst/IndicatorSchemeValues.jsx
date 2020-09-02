import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBBtn } from "mdbreact";
import { IndsAPI } from "@/_services/api-inds.service";
import OrgTree from "react-org-tree";

class IndicatorSchemeValues extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    inds: null,
    goals: null,
    goals_: null,
    inds_: null,
    years: null,
    year: 2018,
    indvals: null,
  };

  selectedYearRef = React.createRef();
  zoomRef = React.createRef();

  getIndicators = (data) => {
    let inds = [];
    let inds_ = [];
    data.forEach((ind) => {
      inds.push({ id: ind.id, pid: ind.goalId, Наименование: ind.code.replace("IND_", ""), Описание: ind.name });
      inds_.push({ id: ind.id, code: ind.code.replace("IND_", ""), name: ind.name, goalId: ind.goalId });
    });
    this.setState({
      inds: inds,
      inds_: inds_,
    });
  };

  getGoals = (data) => {
    let goals = [];
    let goals_ = [];
    data.forEach((goal) => {
      if (goal.name != "Цель 7") {
        goals.push({ id: goal.id, pid: 0, Наименование: goal.name, Описание: goal.description });
        goals_.push({ id: goal.id, name: goal.name, descriptions: goal.description });
      }
    });
    this.setState({
      goals: goals,
      goals_: goals_,
    });
  };

  getYears = (data) => {
    let years = data;
    // data.forEach((year) => {
    //   this.setState({ years: years });
    // });
    this.setState({ years: years });
    //console.log(this.state.years);
  };

  setYear = () => {
    let year = this.selectedYearRef.current.value;
    this.setState({ year: year });
    console.log(this.state.year);
    IndsAPI.getIndDataScheme(year).then((res) => {
      this.getIndValues(res);
    });
  };

  getIndValues = (data) => {
    let indvals = data;
    this.setState({ indvals: indvals });
    console.log(this.state.indvals);
  };

  zoomIn = () => {
    let zoomIn = this.zoomRef.current.style.zoom;
    this.zoomRef.current.style.zoom = Number(zoomIn) + 0.2;
    //debugger;
  };

  zoomOut = () => {
    let zoomOut = this.zoomRef.current.style.zoom;
    if (zoomOut > 0.2) {
      this.zoomRef.current.style.zoom = Number(zoomOut) - 0.2;
    }
  };

  componentDidMount() {
    IndsAPI.getInds().then((res) => {
      this.getIndicators(res);
    });
    IndsAPI.getGoals().then((res) => {
      this.getGoals(res);
    });
    IndsAPI.getYears().then((res) => {
      this.getYears(res);
    });
    IndsAPI.getIndDataScheme(this.state.year).then((res) => {
      this.getIndValues(res);
    });
    //console.log(this.props);
  }

  render() {
    //let nodes = [];

    let orgdata = [];
    if (this.state.indvals) {
      let indval = this.state.indvals;
      let inds = this.state.inds_;
      let indsval = [];
      inds.forEach((item) => {
        let i = indval.find((val) => val.indicatorCode.replace("IND_", "") == item.code);
        //console.log(i);
        if (i) {
          indsval.push({
            id: item.id,
            code: item.code.replace("IND_", ""),
            name: item.name,
            goalId: item.goalId,
            value: i.value.toString(),
            okei: i.okeiName,
          });
        } else {
          indsval.push({ id: item.id, code: item.code.replace("IND_", ""), name: item.name, goalId: item.goalId, value: "", okei: "" });
        }
      });
      //console.log(indsval);
      //debugger;
      // let valtest = this.state.indvals.filter((val) => val.indicatorCode == "IND_1.12.1").map((item) => item.value)[0];
      //let valtest = indval.filter((val) => val.indicatorCode == "IND_1.12.1")[0].value;

      //debugger;
      //console.log(inds);

      orgdata = {
        id: 0,
        label: "Транспортная стратегия Российской Федерации на период до 2030 года",
        expand: true,
        children: this.state.goals_.map((goal) => ({
          id: goal.id,
          label: goal.name,

          children: indsval
            .filter((item) => item.goalId == goal.id)
            .sort((a, b) => (a.code > b.code ? 1 : -1))
            .map((item) => ({
              id: item.id,

              label: item.code.replace("IND_", "") + " " + item.name + " \n " + " (Факт: " + item.value + " " + item.okei + " )",
            })),
        })),
      };
      // this.state.goals_.forEach((goal) => {
      //   orgdata.push({
      //     id: goal.id,
      //     label: goal.name,
      //     children: null,
      //     // this.state.inds_.map((item) => ({ id: item.id, label: item.code.replace("IND_", "") + item.name })),
      //   });
      // });
      //console.log(orgdata);
      //console.log(this.props);
    } else orgdata = null;

    const horizontal = false;
    const collapsable = true;
    const expandAll = false;

    return (
      <div>
        <MDBContainer fluid>
          <MDBRow center style={{ height: "700px" }}>
            <MDBCol md={"12"} className="my-2 mx-auto" style={{ height: "700px" }}>
              <MDBCard style={{ width: "100%", height: "800px" }}>
                <MDBCardHeader color="special-color">Схема индикаторов по целям</MDBCardHeader>
                <MDBCardBody>
                  <MDBContainer fluid style={{ borderBottom: "1px solid #f1f1f1" }}>
                    <MDBRow>
                      <MDBCol md={"4"} size="6" style={{ padding: "7px", textAlign: "left" }}>
                        <MDBBtn onClick={this.zoomIn} color="special-color" size="sm" style={{ width: "60px", fontSize: "14px" }}>
                          +
                        </MDBBtn>
                        <br />
                        <MDBBtn onClick={this.zoomOut} color="special-color" size="sm" style={{ width: "60px", fontSize: "14px" }}>
                          -
                        </MDBBtn>
                      </MDBCol>
                      <MDBCol md={"4"} size="6" style={{ padding: "7px" }}>
                        <span>
                          <select ref={this.selectedYearRef} id="yearForm" className=" custom-select custom-select-md">
                            {this.state.years
                              ? this.state.years.map((item) =>
                                  this.state.year == item.year ? (
                                    <option value={item.year} selected>
                                      {item.year}
                                    </option>
                                  ) : (
                                    <option value={item.year}>{item.year}</option>
                                  )
                                )
                              : null}
                          </select>
                        </span>
                      </MDBCol>
                      <MDBCol md={"4"} size="6" style={{}}>
                        <MDBBtn color="primary" size="md" onClick={this.setYear}>
                          Показать схему
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>

                  {this.state.indvals ? (
                    <div
                      style={{
                        display: "block",
                        overflow: "auto",
                        height: "620px",
                        width: "100%",
                        fontSize: "12px",
                        position: "realtive",
                        textAlign: "center",
                      }}
                    >
                      <div ref={this.zoomRef} style={{ zoom: "1.0" }}>
                        <OrgTree
                          //dangerouslySetInnerHTML={{ __html: orgdata }}
                          data={orgdata}
                          horizontal={horizontal}
                          collapsable={collapsable}
                          expandAll={expandAll}
                          labelWidth={"150px"}
                        ></OrgTree>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                  <MDBCardText></MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default IndicatorSchemeValues;
