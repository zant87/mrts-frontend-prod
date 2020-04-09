import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactEcharts from "echarts-for-react";
import s from "./ParamsChart.module.css";
import Preloader from "@/Common/Preloader/Preloader";

let ParamsChart = (props) => {
  let paramsval = null;
  let chartparamsvals = null;

  let getOption = () => {
    let years = [];

    let okeiName = "";

    if (props.paramVals) {
      paramsval = props.paramVals.sort((a, b) => (a.parameterDate > b.parameterDate ? 1 : -1));

      paramsval.forEach((item) => {
        years.push(item.parameterDate);

        //okeiName = item.okeiName;
      });

      years = paramsval.map((item) => item.parameterDate).filter((item, i, arr) => arr.indexOf(item) === i);

      // --------------------------Объект series для графика------------------
      chartparamsvals = {
        name: "Факт",
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
        data: years.map((year) =>
          paramsval
            .filter((val, i, arr) => {
              if (val.parameterDate == year) {
                return val.value;
              }
            })
            .map((item) => item.value)
            .find((item, i, arr) => arr.indexOf(item) === i)
        ),
      };

      if (props.frequencyId == 1) {
        years = years.filter((item, i, arr) => arr.indexOf(item) === i).map((i) => i.split("-")[0]);
      } else {
        years = years.filter((item, i, arr) => arr.indexOf(item) === i).map((i) => i);
      }
    }

    //------------Объект options для echarts--------------
    return {
      color: ["#006699", "#006699", "#4cabce"],
      //color: ["#62ab1b", "#e37600", "#0091e4"],
      //color: ["#003366", "#006699", "#ec7e13"],
      title: {
        textStyle: {
          fontSize: 11,
          width: 70,
        },
      },
      legend: {
        data: "Факт",
        orient: "horizontal", // 'vertical'
        x: "center", // 'center' | 'left' | {number},
        y: "top", // 'center' | 'bottom' | {number}
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          magicType: {
            show: true,

            type: ["line", "bar", "tiled"],
            title: "Линейный",
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
        name: okeiName,
        nameLocation: "middle",
        nameGap: "45",
        type: "value",
        boundaryGap: ["0%", "50%"],
        //scale: true //масштабирует
      },
      series: chartparamsvals,
      blendMode: "source-over",
      //animationEasing: "elasticOut",
      animationEasing: "bounceIn",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
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
                textTransform: "uppercase",
              }}
            >
              {props.paramVals ? props.paramVals[0].parameterName : <div>Нет данных</div>}
            </MDBCardTitle>
            {props.isFetchingParamData ? (
              <Preloader />
            ) : (
              <MDBCardText className="m-0 p-0">
                {props.paramVals ? <ReactEcharts option={getOption()} className={s.chart} /> : <div>Нет данных</div>}
              </MDBCardText>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default ParamsChart;
