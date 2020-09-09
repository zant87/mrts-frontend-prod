import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactEcharts from "echarts-for-react";
import s from "./BudgetLevelsChart.module.css";
import Preloader from "@/Common/Preloader/Preloader";

let BudgetLevelsChart = (props) => {
  let budLevVals = null;
  let chartBudVals = null;
  let chartLevVals = null;
  let chartbudLevVals = [];
  let echarts_react = React.createRef();

  let getOption = () => {
    let years = [];
    let scenarioName = null;
    let fundingName = null;
    let legend = [];

    if (props.budLevVals) {
      budLevVals = props.budLevVals.sort((a, b) => (a.year > b.year ? 1 : -1));

      budLevVals.forEach((item) => {
        years.push(item.year);
        scenarioName = item.scenarioName;
        fundingName = item.fundingSourceName;
      });

      legend = legend.concat(scenarioName, fundingName).sort((a, b) => (a > b ? 1 : -1));

      years = budLevVals.map((item) => item.year).filter((item, i, arr) => arr.indexOf(item) === i);

      // --------------------------Объекты series для графика------------------

      chartBudVals = {
        name: fundingName,
        type: "bar",
        showBackground: true,
        itemStyle: {
          //color:
          shadowBlur: 10,
          shadowColor: "#cecece",
        },
        large: true,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#000",
              fontWeight: "bold",
              fontSize: "12",
            },
          },
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
        data: budLevVals.map((funVal) => {
          if (funVal.fundingSourceName == fundingName) {
            return funVal.financeLevel;
          }
        }),
      };

      chartLevVals = {
        name: scenarioName,
        type: "bar",
        showBackground: true,
        itemStyle: {
          //color:
          shadowBlur: 10,
          shadowColor: "#cecece",
        },
        large: true,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#000",
              fontWeight: "bold",
              fontSize: "12",
            },
          },
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
        data: budLevVals.map((levVal) => {
          if (levVal.scenarioName == scenarioName) {
            return levVal.indicatorLevel;
          }
        }),
      };
      //debugger;
      chartbudLevVals = chartbudLevVals.concat(chartLevVals, chartBudVals);
    }

    //------------Объект options для echarts--------------
    return {
      color: ["#1a6186", "#ff9702"],
      //color: ["#003366", "#006699"],
      //color: ["#62ab1b", "#e37600", "#0091e4"],
      //color: ["#003366", "#006699", "#ec7e13"],
      title: {
        //text: budLevVals[0].indicatorName,
        textStyle: {
          fontSize: 11,
          width: 70,
        },
      },
      legend: {
        data: legend,
        orient: "horizontal", // 'vertical'
        x: "center", // 'center' | 'left' | {number},
        y: "top", // 'center' | 'bottom' | {number}
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          snap: "true",
        },
      },
      xAxis: {
        data: years,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,

          showDetail: true,
        },
        {
          type: "slider",
          filterMode: "filter",
          show: true,
          start: 0,
          end: 100,
          showDetail: true,

          labelPrecision: "auto",
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "100%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],

      yAxis: {
        axisLabel: {
          show: true,
        },
        name: "%",
        nameLocation: "middle",
        nameGap: "45",
        type: "value",
        boundaryGap: ["0%", "50%"],
        //scale: true //масштабирует
      },
      series: chartbudLevVals,
      blendMode: "source-over",
      //animationEasing: "elasticOut",
      animationEasing: "bounceIn",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
  };

  let setChartLabelshow = () => {
    //debugger;
    let echarts_instance = echarts_react.current.getEchartsInstance();

    let options = echarts_instance.getOption();
    let series = echarts_instance.getOption().series;

    let show = series[0].label.show;
    debugger;
    echarts_instance.setOption({
      series: [
        {
          label: {
            normal: {
              show: !show,
            },
          },
        },
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
              {props.budLevVals ? (
                props.budLevVals[0].indicatorCode.replace("IND_", "") + " " + props.budLevVals[0].indicatorName
              ) : (
                <div>Нет данных</div>
              )}
            </MDBCardTitle>
            {props.isFetchingBudLevData ? (
              <Preloader />
            ) : (
              <MDBCardText className="m-0 p-0">
                {props.budLevVals ? (
                  <div>
                    <div style={{ fontSize: "11px" }}>Заданный период: {props.yearStart + "-" + props.yearEnd + " гг."}</div>
                    <div style={{ fontSize: "11px" }}> Сценарий: {props.budLevVals[0].scenarioName}</div>
                    <div style={{ fontSize: "11px" }}> Источник финансирования: {props.budLevVals[0].fundingSourceName}</div>
                    <div style={{ fontSize: "11px" }}> Вид транспорта: {props.budLevVals[0].transportName}</div>
                    <div style={{ fontSize: "11px" }}> Единица измерения: Процент (%)</div>
                    {/* {props.indFrequencyId == 2 ? " ( " + props.budLevVals[0].quarterName + " )" : ""} */}
                    <ReactEcharts ref={echarts_react} option={getOption()} className={s.chart} />
                  </div>
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

export default BudgetLevelsChart;
