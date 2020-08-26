import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText } from "mdbreact";
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
            .map((item) => ({ id: item.id, label: item.code.replace("IND_", "") + " " + item.name })),
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

    const horizontal = true;
    const collapsable = true;
    const expandAll = true;
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
    let config = {
      pageFitMode: primitives.common.PageFitMode.None,
      maximumColumnsInMatrix: 2,
      cursorItem: 1,
      highlightItem: 0,
      normalItemsInterval: 20,
      cousinsIntervalMultiplier: 1,
      defaultTemplateName: "info",
      templates: [
        {
          name: "info",
          itemSize: { width: 80, height: 36 },
          minimizedItemSize: { width: 3, height: 3 },
          highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
          onItemRender: ({ context: itemConfig }) => {
            return <div className="InfoTemplate">{itemConfig.title}</div>;
          },
        },
      ],
      hasSelectorCheckbox: primitives.common.Enabled.False,
      items: [
        /* vertical layout example */
        {
          id: 101,
          parent: null,
          title: "Vertical Layout",
          childrenPlacementType: primitives.common.ChildrenPlacementType.Vertical,
        },
        { id: 102, parent: 101, title: "Child 1" },
        { id: 103, parent: 101, title: "Child 2", childrenPlacementType: primitives.common.ChildrenPlacementType.Vertical },
        { id: 104, parent: 103, title: "Sub Child 3" },
        { id: 105, parent: 103, title: "Sub Child 4" },
        { id: 106, parent: 101, title: "Child 5" },
        { id: 107, parent: 101, title: "Child 6" },
      ],
    };
    return (
      <div>
        <MDBContainer fluid>
          <MDBRow center>
            <MDBCol md={"12"} className="my-2 mx-auto" style={{ height: "100%" }}>
              <MDBCard style={{ width: "100%" }}>
                <MDBCardHeader color=" special-color">Индикаторы по целям ТС (схема)</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardText>
                    {/* <OrgDiagram centerOnCursor={true} config={config} /> */}
                    {/* <OrganizationChart datasource={ds} collapsible={false} verticalDepth={"2"} depth={2} chartClass="myChart" /> */}
                    {/* {orgdata ? (
                      <div>
                        <OrgTree
                          data={orgdata}
                          horizontal={horizontal}
                          collapsable={collapsable}
                          expandAll={expandAll}
                          labelWidth={"200px"}
                          style={{ fontSize: "8px" }}
                        ></OrgTree>
                      </div>
                    ) : (
                      false
                    )} */}
                    {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
                    {this.state.inds && this.state.goals ? (
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
                    )}
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
