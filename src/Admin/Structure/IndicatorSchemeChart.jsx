import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import "./IndicatorSchemeChart.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  pdf = (nodeId) => {
    debugger;
    this.chart.exportPDF({
      format: "A4",
    });
  };
  preview = () => {
    //debugger;
    OrgChart.pdfPrevUI.show(this.chart, {
      format: "A4",
    });
  };

  componentDidMount() {
    OrgChart.templates.ula.html =
      '<foreignobject style="font-size: 11px; text-align:center;  class="node" x="20" y="10" width="200" height="100"><b>{val}</b></foreignobject>';
    OrgChart.templates.ula.html_title =
      '<foreignobject style="font-size: 9px; text-align:center;" class="node" x="20" y="30" width="200" height="150">{val}</foreignobject>';
    this.chart = new OrgChart(this.divRef.current, {
      //template: "ula",
      //nodeMouseClick: OrgChart.action.edit,
      orderBy: "Наименование",
      align: OrgChart.ORIENTATION,
      template: "ula",
      enableSearch: false,
      scaleInitial: 1,
      //scaleMin: 0.2,
      collapse: {
        level: 3,
        allChildren: true,
      },
      //layout: OrgChart.mixed,
      layout: OrgChart.treeRightOffset,
      // nodeMenu: {
      //   details: { text: "Инфо" },
      // },
      showYScroll: OrgChart.scroll.visible,
      mouseScrool: OrgChart.action.zoom,
      //mouseScrool: OrgChart.action.scroll,
      //mouseScrool: OrgChart.action.none,
      nodes: this.props.nodes,
      toolbar: {
        //fullScreen: true,
        zoom: true,
        // fit: true,
        // expandAll: true,
      },
      menu: {
        export_pdf: {
          text: "Выгрузить в PDF",
          icon: OrgChart.icon.pdf(24, 24, "#7A7A7A"),
          onClick: this.pdf,
        },
        // pdfPreview: {
        //   text: "Выгрузить в PDF",
        //   icon: OrgChart.icon.pdf(24, 24, "#7A7A7A"),
        //   onClick: this.preview,
        // },
        csv: { text: "Сохранить в CSV" },
      },
      nodeBinding: {
        // field_1: function (sender, node) {
        //   var data = sender.get(node.id);
        //   var title = data["title"];
        //   //var link = data["link"];
        //   return "<div>" + title + "</div>";
        // },
        //field_0: "html",
        //html: "title",
        html: "Наименование",
        html_title: "Описание",
        // field_1: "title",
      },
    });
  }

  render() {
    return <div id="tree" style={{ height: "100%", width: "100%", position: "relative" }} ref={this.divRef}></div>;
  }
}
