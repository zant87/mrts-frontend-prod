import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactEcharts from "echarts-for-react";
import s from "./DynamicsChart.module.css";
import Preloader from "@/Common/Preloader/Preloader";

let DynamicsChart = (props) => {
  let dynVals = null;
  let echarts_react = React.createRef();
  let chartDynvals = [];
  let checkedInds = [];

  let getOption = () => {
    let years = [];
    let scenarioNames = [];
    let okeiName = "";

    if (props.dynVals) {
      dynVals = props.dynVals.sort((a, b) => (a.indicatorCode > b.indicatorCode ? 1 : -1));

      dynVals.forEach((item) => {
        //debugger;
        years.push(item.currentDate);
        scenarioNames.push(item.scenarioName);
        okeiName = item.okeiName;
        let ind = item.indicatorCode.replace("IND_", "") + " " + item.shortName;
        checkedInds.push(ind);
      });

      // --------------------------Объект data для графика------------------
      chartDynvals = dynVals.map((item) => ({
        value: item.dynamic,
        itemStyle: { color: item.dynamic < 0 ? "#c60d0d" : "#2c770e" },
        tooltip: {
          formatter: "{b} " + item.indicatorName + "<br /> Динамика: {c} %",
          textStyle: {
            width: "300px",
            height: "400px",
          },
        },
        label: {
          formatter: item.currentLevel > 100 ? "{c} % (Достигнут)" : "{c} % (Не достигнут)",
          position: item.dynamic < 0 ? "left" : "right",
        },
      }));
    }

    //------------Объект options для echarts--------------
    return {
      color: ["#2c770e"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          snap: "false",
        },
      },

      legend: {
        data: ["Динамика уровня достижения за " + dynVals[0].quarterLabel + " г."],
      },
      grid: {
        // left: '3%',
        //  right: '4%',
        //  bottom: '3%',
        containLabel: true,
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
          myTool: {
            show: true,
            title: "Показать/скрыть значения",
            icon: "image://https://img.icons8.com/metro/26/000000/7.png",
            onclick: function () {
              setChartLabelshow();
            },
          },
          magicType: {
            show: true,
            // type: ["line", "bar", "stack", "tiled"],
            type: ["line", "bar", "tiled"],
            title: {
              line: "Линейный",
              bar: "Столбчатый",
            },
          },
          dataView: {
            title: "Данные",
            readOnly: false,
            lang: ["Просмотр данных", "Закрыть", "Обновить"],
          },
          saveAsImage: { show: true, title: "Скачать", pixelRatio: "3" },
        },
      },
      xAxis: [
        {
          type: "value",
          logBase: 5,
          name: "Проценты, %",
          nameLocation: "middle",
          nameGap: "45",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          boundaryGap: ["50%", "50%"],
          //scale: true, //масштабирует
        },
      ],

      yAxis: [
        {
          //name: "Индикаторы",
          type: "category",

          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
          },
          inverse: true,
          data: checkedInds,
          nameTextStyle: {
            fontSize: "10",
          },
          axisLabel: {
            fontSize: "10",
          },
        },
      ],
      series: [
        {
          name: "Динамика уровня достижения за " + dynVals[0].quarterLabel + " г.",
          type: "bar",
          label: {
            show: true,
            position: "left",
            color: "#000000",
            textStyle: {
              fontSize: "12",
            },
          },
          data: chartDynvals,
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
              {props.dynVals ? "Динамика уровней достижения за " + props.dynVals[0].quarterLabel + " г." : <div>Нет данных</div>}
            </MDBCardTitle>
            {props.isFetchingDynData ? (
              <Preloader />
            ) : (
              <MDBCardText className="m-0 p-0">
                {props.dynVals ? (
                  <ReactEcharts
                    style={{ margin: "0px", padding: "0px", width: "100%" }}
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

export default DynamicsChart;
