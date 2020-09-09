import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import ReactEcharts from "echarts-for-react";
import s from "./LevelsChart.module.css";
import Preloader from "@/Common/Preloader/Preloader";


let LevelsChart = (props) => {
  let levVals = null;
  let echarts_react = React.createRef();
  let chartLevvals = [];
  let checkedInds = [];
  let checkedGoal = null;

  if (props.checkedGoal) {
    checkedGoal = props.checkedGoal;
  }
  

  let getOption = () => {
    if (props.levVals) {
      levVals = props.levVals.sort((a, b) =>
        a.indicatorCode > b.indicatorCode ? 1 : -1
      );

      levVals.forEach((item) => {
        let ind = item.indicatorCode.replace("IND_", ""); //+ " " + item.indicatorName;
        checkedInds.push(ind);
      });

      // --------------------------Объект data для графика------------------
      chartLevvals = levVals.map((item) => ({
        value: item.level,
        name: "Уровни достижения за " + item.quarterLabel + " г.",
        //itemStyle: { color: item.dynamic < 0 ? "#c60d0d" : "#2c770e" },
        tooltip: {
          formatter: "{b} " + item.indicatorName + "<br /> Динамика: {c} %",
          textStyle: {
            width: "300px",
            height: "400px",
          },
        },
        label: {
          // formatter: item.currentLevel > 100 ? "{c} % (Достигнут)" : "{c} % (Не достигнут)",
          //position: item.dynamic < 0 ? "left" : "right",
        },
      }));
    }

    //------------Объект options для echarts--------------
    return {
      color: ["#006699"],
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Уровень достижения"],
      },
      toolbox: {
        show: true,
        tooltip: {
          // same as option.tooltip
          show: true,
          formatter: function (param) {
            return "<div>" + param.title + "</div>"; // user-defined DOM structure
          },
          backgroundColor: "#222",
          textStyle: {
            fontSize: 12,
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);", // user-defined CSS styles
        },

        feature: {
          mark: { show: true },
          // myTool: {
          //   show: true,
          //   title: "Показать/скрыть значения",
          //   icon: "image://https://img.icons8.com/metro/26/000000/7.png",
          //   onclick: function () {
          //     setChartLabelshow();
          //   },
          // },

          dataView: {
            title: "Данные",
            readOnly: false,
            lang: ["Просмотр данных", "Закрыть", "Обновить"],
          },
          saveAsImage: { show: true, title: "Скачать", pixelRatio: "3" },
        },
      },
      radar: {
        // axisLabel: {
        //   show: true,
        // },
        axisTick: {
          show: true,
          //length: 50,
        },
        splitLine: {
          show: true,
        },
        splitArea: {
          show: true,
        },
        //scale: true,
        //shape: "circle",
        name: {
          color: "#000000",
          // backgroundColor: "#999",
          borderRadius: 3,
          padding: [5, 5],
          width: 200,
          height: 100,
          fontSize: "12px",
        },
        indicator: levVals.map((item) => ({
          name: item.indicatorCode.replace("IND_", "") + " " + item.shortName,
          max: item.level + 30,
        })),
      },
      series: [
        {
          //name: "Уровень достижения",
          type: "radar",
          // areaStyle: {normal: {}},
          label: {
            show: true,
            formatter: "{c} %",
            color: "#fff",
            backgroundColor: "#006699",
            borderRadius: 3,
            padding: [3, 5],
          },
          data: [
            {
              value: levVals.map((item) => item.level),
              name: "Уровень достижения",
            },
          ],
        },
      ],
    };
  };

  let setChartLabelshow = () => {
    let echarts_instance = echarts_react.current.getEchartsInstance();
    let options = echarts_instance.getOption();
    let series = echarts_instance.getOption().series;
    debugger;
    let show = series[0].label.show;

    echarts_instance.setOption({
      series: [
        {
          label: {
            normal: {
              show: !show,
            },
          },
        },
      ],
    });
  };

  return (
    <MDBRow>
      <MDBCol>
        <MDBCard className="w-100 ">
          <MDBCardBody>
            <MDBCardTitle
              style={{
                fontSize: "14px",
                lineHeight: "1.5",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {props.levVals ? (
                // "Уровни достижения индикаторов за " +
                // props.levVals[0].year +
                // " г. " + 
                // (props.frequencyLevId == 2
                //   ? "( " + props.levVals[0].quarterLabel + " )"
                //   : "") 
                //     +  (checkedGoal ? <div >{checkedGoal.name + ". " + checkedGoal.description }</div> : "" )
                <div>
               Уровни достижения индикаторов за {" "}
                {props.levVals[0].year +
                  " г. " +
                  (props.frequencyLevId == 2
                    ? "( " + props.levVals[0].quarterLabel + " )"
                    : "")}{" "}
                <br />
               {checkedGoal ? checkedGoal.name + ". " + checkedGoal.description  : ""}
              </div>
              ) : (
                <div>Нет данных</div>
              )}
            </MDBCardTitle>
            
            {props.isFetchingLevData ? (
              <Preloader />
            ) : (
              <MDBCardText className="m-0 p-0">
                {props.levVals ? (
                  <ReactEcharts
                    ref={echarts_react}
                    option={getOption()}
                    className={s.chart}
                  />
                ) : (
                  <div>Нет данных</div>
                )}
              </MDBCardText>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default LevelsChart;

