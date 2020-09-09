import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBBtn } from "mdbreact";
import { IndsAPI } from "@/_services/api-inds.service";
import { OrgDiagram } from "basicprimitivesreact";
import primitives from "basicprimitives";
import OrgChart from "./IndicatorSchemeChart";
import OrgTree from "react-org-tree";

//import OrgChart from "awesome-react-org-chart";

// import Chart from "react-google-charts";
//import OrganizationChart from "@dabeng/react-orgchart";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsSankey from "highcharts/modules/sankey";
// import HighchartsOrganization from "highcharts/modules/organization";
// import HighchartsExporting from "highcharts/modules/exporting";

// HighchartsSankey(Highcharts);
// HighchartsOrganization(Highcharts);
// HighchartsExporting(Highcharts);

class IndicatorScheme extends React.Component {
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
      if (ind.isCalc == 1) {
        inds.push({ id: ind.id, pid: ind.goalId, Наименование: ind.code.replace("IND_", ""), Описание: ind.name });
        inds_.push({
          id: ind.id,
          code: ind.code.replace("IND_", ""),
          name: ind.name,
          goalId: ind.goalId,
          transport: ind.transportTypeName,
          transportid: ind.transportTypeId,
        });
      }
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
      //let uniqueTransport = [...new Set(this.state.inds_.map(tran => tran.transportid))];

      orgdata = {
        id: 0,
        label: "Транспортная стратегия Российской Федерации на период до 2030 года",
        expand: true,
        children: this.state.goals_
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((goal) => ({
            id: goal.id,
            label: goal.name,
            children: [...new Set(this.state.inds_.filter((item) => goal.id == item.goalId).map((tran) => tran.transport))]
              .sort(function (a, b) {
                if (a > b) {
                  return 1;
                }
                if (a < b) {
                  return -1;
                }
                if (a == "") {
                  return -1;
                }
              })
              .map((tran) => ({
                id: tran,
                label: tran == null ? "Остальное" : tran,
                children: this.state.inds_
                  .filter((item) => item.goalId == goal.id && item.transport == tran)
                  .sort((a, b) => (a.code > b.code ? 1 : -1))
                  .map((item) => ({
                    id: item.id,

                    label: item.code.replace("IND_", "") + " " + item.name,
                  })),
              })),
          })),
      };

      // orgdata = {
      //   id: 0,
      //   label: "Транспортная стратегия Российской Федерации на период до 2030 года",
      //   expand: true,
      //   children: this.state.goals_.sort((a, b) => (a.name > b.name ? 1 : -1)).map((goal) => ({
      //     id: goal.id,
      //     label: goal.name,
      //     children: this.state.inds_
      //       .filter((item) => item.goalId == goal.id)
      //       .sort((a, b) => (a.code > b.code ? 1 : -1))
      //       .map((item) => ({
      //         id: item.id,

      //         label: item.code.replace("IND_", "") + " " + item.name,
      //       })),
      //   })),
      // };

      //let transport = [...new Set(this.state.inds_.map(data => data.transport))];
      //console.log(this.state.inds_);

      //console.log(orgdata);
    } else orgdata = null;

    const horizontal = false;
    const collapsable = true;
    const expandAll = false;
    // const data = {
    //   id: 0,
    //   label: "Транспортная стратегия",
    //   children: [
    //     {
    //       id: 1,
    //       label: "Цель 1",
    //       children: [
    //         {
    //           id: 4,
    //           label: "1.1 Ввоывэпоыждпждывьопждывоп",
    //         },
    //         {
    //           id: 5,
    //           label: "1.2 вылдптолдывполдвоыпждлвып",
    //         },
    //         {
    //           id: 6,
    //           label: "1.3 выпопщждывопждоывпждоыпж",
    //         },
    //       ],
    //     },
    //     {
    //       id: 2,
    //       label: "Цель 2",
    //     },
    //     {
    //       id: 3,
    //       label: "Цель 3",
    //     },
    //   ],
    // };
    const config = {
      pageFitMode: primitives.common.PageFitMode.None,
      maximumColumnsInMatrix: 2,
      //cursorItem: 1,
      //highlightItem: 0,
      normalItemsInterval: 20,
      cousinsIntervalMultiplier: 1,
      itemTitleSecondFontColor: primitives.common.Colors.White,
      leavesPlacementType: primitives.common.ChildrenPlacementType.Matrix,
      arrowsDirection: primitives.common.GroupByType.Children,
      //scale: 1,
      labelFontSize: "24px",
      defaultTemplateName: "info",
      templates: [
        {
          name: "info",
          itemSize: { width: 80 },
          //itemBorderWidth: 1,
          //minimizedItemLineWidth: 1,
          //minimizedItemSize: { width: 3, height: 3 },
          //highlightPadding: { left: 4, top: 4, right: 4, bottom: 0 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div
                //className="InfoTemplate"
                dangerouslySetInnerHTML={{ __html: itemConfig.title }}
                style={{
                  backgroundColor: "#fff",
                  //minWidth: "200px",
                  //height: "100%",
                  fontSize: "14px",
                }}
              >
                {/* {itemConfig.title} */}
              </div>
            );
          },
        },
      ],
      hasSelectorCheckbox: primitives.common.Enabled.False,
      items: [
        /* vertical layout example */
        {
          id: 101,
          parent: null,
          title: "Транспортная стратегия Российской Федерации на период до 2030 года",
          childrenPlacementType: primitives.common.ChildrenPlacementType.Horizontal,
        },
        { id: 102, parent: 101, title: "<b>Цель 1</b>" },
        { id: 106, parent: 101, title: "Цель 2" },
        { id: 107, parent: 101, title: "Цель 3" },
        { id: 108, parent: 101, title: "Цель 4" },
        { id: 109, parent: 101, title: "Цель 5" },
        { id: 103, parent: 101, title: "Цель 6", childrenPlacementType: primitives.common.ChildrenPlacementType.Matrix },
        { id: 104, parent: 103, title: "6.1" },
        { id: 105, parent: 103, title: "6.2" },
        { id: 1014, parent: 103, title: "6.3" },
        { id: 1015, parent: 103, title: "6.4" },
      ],
    };

    return (
      <div>
        <MDBContainer fluid>
          <MDBRow center style={{ height: "700px" }}>
            <MDBCol md={"12"} className="my-2 mx-auto" style={{ height: "700px" }}>
              <MDBCard style={{ width: "100%", height: "800px" }}>
                <MDBCardHeader color=" special-color">Индикаторы по целям ТС (схема)</MDBCardHeader>
                <MDBCardBody>
                  {/* <div style={{ display: "block", overflow: "scroll", height: "700px" }}>
                    <OrgDiagram centerOnCursor={true} config={config} />
                  </div> */}
                  <div>
                    <MDBBtn onClick={this.zoomIn} color="special-color" outline size="sm" style={{ width: "60px", fontSize: "14px" }}>
                      +
                    </MDBBtn>
                    <br />
                    <MDBBtn onClick={this.zoomOut} color="special-color" outline size="sm" style={{ width: "60px", fontSize: "14px" }}>
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
                  <MDBCardText>
                    {/* <OrganizationChart datasource={ds} collapsible={false} verticalDepth={"2"} depth={2} chartClass="myChart" /> */}

                    {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
                    {/* {this.state.inds && this.state.goals ? (
                      <OrgChart
                        nodes={nodes.concat(
                          {
                            id: 0,
                            Наименование: "Транспортная стратегия Российской Федерации на период до 2030 года",
                          },
                          this.state.goals,
                          this.state.inds
                        )}
                      />
                    ) : (
                      false
                    )} */}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default IndicatorScheme;

// const ds = {
//   id: "n1",
//   name: "Lao Lao",
//   title: "general manager",
//   children: [
//     { id: "n2", name: "Bo Miao", title: "department manager" },
//     {
//       id: "n3",
//       name: "Su Miao",
//       title: "department manager",
//       children: [
//         { id: "n4", name: "Tie Hua", title: "senior engineer" },
//         {
//           id: "n5",
//           name: "Hei Hei",
//           title: "senior engineer",
//           children: [
//             { id: "n6", name: "Dan Dan", title: "engineer" },
//             { id: "n7", name: "Xiang Xiang", title: "engineer" },
//           ],
//         },
//         { id: "n8", name: "Pang Pang", title: "senior engineer" },
//       ],
//     },
//     { id: "n9", name: "Hong Miao", title: "department manager" },
//     {
//       id: "n10",
//       name: "Chun Miao",
//       title: "department manager",
//       children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }],
//     },
//   ],
// };

{
  /* <OrganizationChart datasource={ds} chartClass="myChart" /> */
}
{
  /* <HighchartsReact highcharts={Highcharts} options={options} /> */
}
{
  /* {this.state.inds ? this.state.inds[0].name : false} */
}
{
  /* <Chart
                width={"100%"}
                height={350}
                chartType="OrgChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Name", "Manager", "ToolTip"],
                  [
                    {
                      v: "TS",
                      f: 'Транспортная стратегия<div style="color:red; font-style:italic">Цель 1</div>',
                    },
                    "",
                    "",
                  ],
                  ["Цель 1", "TS", ""],
                  ["1.1.1", "Цель 1", ""],
                  ["1.1.2", "Цель 1", ""],
                  ["Цель 2", "TS", ""],
                  ["Цель 3", "TS", ""],
                  ["Цель 4", "TS", ""],
                  ["Цель 5", "TS", ""],
                  ["Цель 6", "TS", ""],
                ]}
                options={{
                  allowHtml: true,
                }}
              /> */
}

// const options = {
//   chart: {
//     height: 800,
//     inverted: true,
//   },

//   title: {
//     text: "Индикаторы по целям (схема)",
//   },

//   accessibility: {
//     point: {
//       descriptionFormatter: function (point) {
//         var nodeName = point.toNode.name,
//           nodeId = point.toNode.id,
//           nodeDesc = nodeName === nodeId ? nodeName : nodeName + ", " + nodeId,
//           parentDesc = point.fromNode.id;
//         return point.index + ". " + nodeDesc + ", reportsList to " + parentDesc + ".";
//       },
//     },
//   },

//   series: [
//     {
//       enableMouseTracking: true,
//       type: "organization",
//       name: "Highsoft",
//       keys: ["from", "to"],
//       data: [
//         ["TS", "Goal1"],
//         ["TS", "Goal2"],
//         ["TS", "Goal3"],
//         ["TS", "Goal4"],
//         ["TS", "Goal5"],
//         ["TS", "Goal6"],
//         ["Goal1", "1.1"],
//         ["Goal1", "1.2"],
//         ["Goal1", "1.3"],
//         ["Goal1", "1.4"],
//         ["Goal1", "1.5"],
//         ["Goal1", "1.6"],
//         ["Goal1", "1.7"],
//         ["Goal1", "1.8"],
//         ["Goal1", "1.9"],
//         ["Goal1", "1.10"],
//         ["Goal1", "1.11"],
//         ["Goal1", "1.12"],
//         ["Goal1", "1.13"],
//         ["Goal1", "1.14"],
//         ["Goal1", "1.15"],
//         ["Goal1", "1.16"],
//         ["Goal1", "1.17"],
//         ["Goal1", "1.18"],
//         ["Goal2", "2.1"],
//         ["Goal2", "2.2"],
//         ["Goal3", "3.1"],
//       ],
//       levels: [
//         {
//           level: 0,
//           color: "silver",
//           dataLabels: {
//             color: "black",
//             style: {
//               fontSize: "10px",
//             },
//           },
//           height: 25,
//         },
//         {
//           level: 1,
//           color: "silver",
//           dataLabels: {
//             color: "black",
//           },
//           height: 25,
//         },
//         {
//           level: 2,
//           color: "#980104",
//         },
//         {
//           level: 4,
//           color: "#359154",
//         },
//       ],
//       nodes: [
//         {
//           id: "TS",
//           name: "Транспортная стратегия Российской Федерации до 2030 г.",
//         },
//         {
//           id: "Goal1",
//           name: "Цель 1",
//           layout: "hanging",
//         },
//         {
//           id: "Goal2",
//           name: "Цель 2",
//           layout: "hanging",
//         },
//         {
//           id: "Goal3",
//           name: "Цель 3",
//           layout: "hanging",
//         },
//         {
//           id: "Goal4",
//           name: "Цель 4",
//           layout: "hanging",
//         },
//         {
//           id: "Goal5",
//           name: "Цель 5",
//           layout: "hanging",
//         },
//         {
//           id: "Goal6",
//           name: "Цель 6",
//           layout: "hanging",
//         },
//         {
//           id: "1.1",

//           title: "1.1",
//           name: "1.1",
//         },
//         {
//           id: "1.2",

//           title: "1.2",
//           name: "1.2",
//           layout: "hanging",
//         },
//         {
//           id: "1.3",

//           title: "1.3",
//           name: "1.3",
//         },
//         {
//           id: "1.4",

//           title: "1.4",
//           name: "1.4",
//         },
//         {
//           id: "1.5",

//           title: "1.5",
//           name: "1.5",
//         },
//         {
//           id: "1.6",

//           title: "1.6",
//           name: "1.6",
//         },
//         {
//           id: "1.7",

//           title: "1.7",
//           name: "1.7",
//         },
//         {
//           id: "1.8",

//           title: "1.8",
//           name: "1.8",
//         },
//         {
//           id: "1.9",
//           title: "1.9",
//           name: "1.9",
//         },
//         {
//           id: "1.10",
//           title: "1.10",
//           name: "1.10",
//         },
//         {
//           id: "2.1",
//           title: "2.1",
//           name: "2.1",
//         },
//         {
//           id: "2.2",
//           title: "2.2",
//           name: "2.2",
//         },
//         {
//           id: "3.1",
//           title: "3.1",
//           name: "3.1",
//         },
//       ],
//       colorByPoint: false,
//       color: "#007ad0",
//       dataLabels: {
//         color: "white",
//       },
//       borderColor: "white",
//       nodeWidth: 50,
//     },
//   ],
//   // tooltip: {
//   //   outside: true,
//   // },
//   exporting: {
//     allowHTML: true,
//     sourceWidth: 800,
//     sourceHeight: 600,
//   },
// };
