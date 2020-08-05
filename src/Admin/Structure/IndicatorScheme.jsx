import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText } from "mdbreact";
import { IndsAPI } from "@/_services/api-inds.service";
import OrgChart from "./IndicatorSchemeChart";
// import Chart from "react-google-charts";
// import OrganizationChart from "@dabeng/react-orgchart";
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
    };
  }

  getIndicators = (data) => {
    let inds = [];
    data.forEach((ind) => {
      inds.push({ id: ind.id, pid: ind.goalId, Наименование: ind.code.replace("IND_", ""), Описание: ind.name });
    });
    this.setState({
      inds: inds,
    });
  };

  getGoals = (data) => {
    let goals = [];
    data.forEach((goal) => {
      if (goal.name != "Цель 7") {
        goals.push({ id: goal.id, pid: 0, Наименование: goal.name, Описание: goal.description });
      }
    });
    this.setState({
      goals: goals,
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
    return (
      <div>
        <MDBContainer fluid>
          <MDBRow center>
            <MDBCol md={"12"} className="my-2 mx-auto" style={{ height: "100%" }}>
              <MDBCard style={{ width: "100%" }}>
                <MDBCardHeader color=" special-color">Индикаторы по целям ТС (схема)</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardText>
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
//         return point.index + ". " + nodeDesc + ", reports to " + parentDesc + ".";
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
