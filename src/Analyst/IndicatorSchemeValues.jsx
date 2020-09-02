import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBBtn } from "mdbreact";
import { IndsAPI } from "@/_services/api-inds.service";
import OrgTree from "react-org-tree";

class IndicatorSchemeValues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inds: null,
      goals: null,
      goals_: null,
      inds_: null,
    };
  }
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

  async componentDidMount() {
    IndsAPI.getInds().then((res) => {
      this.getIndicators(res);
    });
    IndsAPI.getGoals().then((res) => {
      this.getGoals(res);
    });
  }

  render() {
    let nodes = [];

    let orgdata = [];
    if (this.state.inds_ && this.state.goals_) {
      orgdata = {
        id: 0,
        label: "Транспортная стратегия Российской Федерации на период до 2030 года",
        expand: true,
        children: this.state.goals_.map((goal) => ({
          id: goal.id,
          label: goal.name,

          children: this.state.inds_
            .filter((item) => item.goalId == goal.id)
            .sort((a, b) => (a.code > b.code ? 1 : -1))
            .map((item) => ({
              id: item.id,

              label: item.code.replace("IND_", "") + " " + item.name,
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
      console.log(orgdata);
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
                <MDBCardHeader color=" special-color">Схема индикаторов по целям</MDBCardHeader>
                <MDBCardBody>
                  <div>
                    <MDBBtn onClick={this.zoomIn} color="primary" outline size="sm" style={{ width: "60px" }}>
                      +
                    </MDBBtn>
                    <br />
                    <MDBBtn onClick={this.zoomOut} color="primary" outline size="sm" style={{ width: "60px" }}>
                      -
                    </MDBBtn>
                  </div>
                  {orgdata ? (
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
