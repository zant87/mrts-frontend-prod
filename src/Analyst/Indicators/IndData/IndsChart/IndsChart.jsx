import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactEcharts from "echarts-for-react";
import s from "./indsChart.module.css";
import Preloader from "@/Common/Preloader/Preloader";

let IndsChart = props => {
  let indsval = null;
  let chartindsvals = null;

  let getOption = () => {
    let years = [];
    let scenarioNames = [];
    let okeiName = "";

    if (props.indVals) {
      indsval = props.indVals.sort((a, b) => (a.indicatorDate > b.indicatorDate ? 1 : -1));

      indsval.forEach(item => {
        years.push(item.indicatorDate);
        scenarioNames.push(item.scenarioName);
        okeiName = item.okeiName;
      });

      years = indsval.map(item => item.indicatorDate).filter((item, i, arr) => arr.indexOf(item) === i);

      scenarioNames = indsval.map(item => item.scenarioName).filter((item, i, arr) => arr.indexOf(item) === i);

      // --------------------------Объект series для графика------------------
      chartindsvals = scenarioNames.map(scen => ({
        name: scen,
        type: "bar",
        showBackground: true,
        itemStyle: {
          //color:
          shadowBlur: 10,
          shadowColor: "#cecece"
        },
        large: true,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#000",
              fontWeight: "bold",
              fontSize: "12"
            }
          }
        },
        animationDelay: function(idx) {
          return idx * 10;
        },
        data: years.map(year =>
          indsval
            .filter((val, i, arr) => {
              if (val.scenarioName == scen && val.indicatorDate == year) {
                return val.value;
              }
            })
            .map(item => item.value)
            .find((item, i, arr) => arr.indexOf(item) === i)
        )
      }));
      //console.log(chartindsvals);
      //years = indsval.map(item => item.indicatorDate.split("-")[0]).filter((item, i, arr) => arr.indexOf(item) === i);
      if (props.frequencyId == 1) {
        years = years.filter((item, i, arr) => arr.indexOf(item) === i).map(i => i.split("-")[0]);
      } else {
        years = years.filter((item, i, arr) => arr.indexOf(item) === i).map(i => i);
      }

      // years = years.filter((item, i, arr) => arr.indexOf(item) === i).map(i => i.split("-")[0]);
    }

    //------------Объект options для echarts--------------
    return {
      //color: ["#003366", "#006699", "#4cabce"],
      //color: ["#62ab1b", "#e37600", "#0091e4"],
      color: ["#003366", "#006699", "#ec7e13"],
      title: {
        //text: indsval[0].indicatorName,
        textStyle: {
          fontSize: 11,
          width: 70
        }
      },
      legend: {
        data: scenarioNames,
        orient: "horizontal", // 'vertical'
        x: "center", // 'center' | 'left' | {number},
        y: "top" // 'center' | 'bottom' | {number}
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          magicType: {
            show: true,
            type: ["line", "bar", "stack", "tiled"],
            title: "Линейный"
          },
          dataView: {
            title: "Данные",
            readOnly: false,
            lang: ["Просмотр данных", "Закрыть", "Обновить"]
          },
          saveAsImage: { show: true, title: "Скачать", pixelRatio: "2" }
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          snap: "true"
        }
      },
      xAxis: {
        data: years,
        silent: false,
        splitLine: {
          show: false
        }
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 50,

          showDetail: true
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
            shadowOffsetY: 2
          }
        }
      ],
      yAxis: {
        name: okeiName,
        nameLocation: "middle",
        nameGap: "45",
        type: "value",
        boundaryGap: ["0%", "50%"]
        //scale: true //масштабирует
      },
      series: chartindsvals,
      blendMode: "source-over",
      //animationEasing: "elasticOut",
      animationEasing: "bounceIn",
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };
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
                textTransform: "uppercase"
              }}
            >
              {props.indVals ? (
                props.indVals[0].indicatorCode.replace("IND_", "") + " " + props.indVals[0].indicatorName
              ) : (
                <div>Нет данных</div>
              )}
            </MDBCardTitle>
            {props.isFetchingIndData ? (
              <Preloader />
            ) : (
              <MDBCardText className="w-100 m-0 p-0">
                {props.indVals ? <ReactEcharts option={getOption()} className={s.chart} /> : <div>Нет данных</div>}
              </MDBCardText>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default IndsChart;
