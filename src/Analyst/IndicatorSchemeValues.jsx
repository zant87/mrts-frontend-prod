import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBBtn } from "mdbreact";
import { IndsAPI } from "@/_services/api-inds.service";
import OrgTree from "react-org-tree";
import Preloader from "@/Common/Preloader/Preloader";

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
    isFetchingvals: true
  };

  selectedYearRef = React.createRef();
  zoomRef = React.createRef();

  getIndicators = (data) => {
    let inds = [];
    let inds_ = [];
    data.forEach((ind) => {
      inds.push({ id: ind.id, pid: ind.goalId, Наименование: ind.code.replace("IND_", ""), Описание: ind.name });
      inds_.push({ id: ind.id, code: ind.code.replace("IND_", ""), name: ind.name, goalId: ind.goalId, transport: ind.transportTypeName, transportid: ind.transportTypeId });
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
    this.setState({ years: years });
    };

  setYear = () => {
    
    let year = this.selectedYearRef.current.value;
    this.setState({ year: year, isFetchingvals: true });
  
    IndsAPI.getIndDataScheme(year).then((res) => {
      this.getIndValues(res);
    });
  };

  getIndValues = (data) => {
    let indvals = data;
    this.setState({ 
      indvals: indvals, 
      isFetchingvals: false
    });
   };

  zoomIn = () => {
    let zoomIn = this.zoomRef.current.style.zoom;
    this.zoomRef.current.style.zoom = Number(zoomIn) + 0.2;
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
  }

  render() {
 
    let orgdata = [];

    if (this.state.indvals) {
      let indval = this.state.indvals;
      let inds = this.state.inds_;
      let indsval = [];
      inds.forEach((item) => {
        let i = indval.find((val) => val.indicatorCode.replace("IND_", "") == item.code);
      
        if (i) {
          indsval.push({
            id: item.id,
            code: item.code.replace("IND_", ""),
            name: item.name,
            goalId: item.goalId,
            value: i.value.toString(),
            okei: i.okeiName,
            transport: item.transport
          });
        } else {
          indsval.push({ id: item.id, code: item.code.replace("IND_", ""), name: item.name, goalId: item.goalId, value: "", okei: "", transport: item.transport });
        }
      });
      //console.log(inds);
      //console.log(indsval);

      orgdata = {
        id: 0,
        label: "Транспортная стратегия Российской Федерации на период до 2030 года",
        expand: true,
        children: this.state.goals_.sort((a, b) => (a.name > b.name ? 1 : -1)).map((goal) => ({
          id: goal.id,
          label: goal.name,
          children: [...new Set(this.state.inds_.filter(item => goal.id == item.goalId).map(tran => tran.transport))].sort(
            function (a, b) {
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              }
              if (a == "" ) {
              return -1;
              }
            }
            ).map(tran => ({
            id: tran,
            label: tran == null ? "Прочие" : tran ,
            children: indsval
            .filter((item) => item.goalId == goal.id && item.transport == tran)
            .sort((a, b) => (a.code > b.code ? 1 : -1))
            .map((item) => ({
            id: item.id,
            label: item.code.replace("IND_", "") + " " + item.name + " " + " (Факт: " + item.value + " " + item.okei + " )",
            })),
          }))
        })),
      };


      // orgdata = {
      //   id: 0,
      //   label: "Транспортная стратегия Российской Федерации на период до 2030 года",
      //   expand: true,
      //   children: this.state.goals_.sort((a, b) => (a.name > b.name ? 1 : -1)).map((goal) => ({
      //     id: goal.id,
      //     label: goal.name,
      //     children: indsval
      //       .filter((item) => item.goalId == goal.id)
      //       .sort((a, b) => (a.code > b.code ? 1 : -1))
      //       .map((item) => ({
      //         id: item.id,

      //         label: item.code.replace("IND_", "") + " " + item.name + " " + " (Факт: " + item.value + " " + item.okei + " )",
      //       })),
      //   })),
      // };

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
                      <MDBCol md={"3"} size="6" style={{ padding: "7px" }}>
                        <span>
                          <select  ref={this.selectedYearRef} id="yearForm" className=" custom-select custom-select-md">
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
                      <MDBCol md={"5"} size="6" style={{}}>
                        <MDBBtn color="primary" size="md" onClick={this.setYear}>
                          Показать схему
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                  <div
                      style={{
                        display: "block",
                        overflow: "auto",
                        height: "600px",
                        width: "100%",
                        fontSize: "12px",
                        position: "realtive",
                        textAlign: "center",
                      }}
                    >          
                     
                  {this.state.isFetchingvals ? (<Preloader />) : this.state.indvals ? (
                     
                      <div ref={this.zoomRef} style={{ zoom: "1.0" }}>
                        <OrgTree
                        
                          data={orgdata}
                          horizontal={horizontal}
                          collapsable={collapsable}
                          expandAll={expandAll}
                          labelWidth={"150px"}
                        ></OrgTree>
                      </div>
                     
                    
                  ) : (
                   "Нет данных"
                  )}
                  </div> 
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
