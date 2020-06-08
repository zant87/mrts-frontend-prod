import React from 'react';
import {loadModules} from 'esri-loader';
import config from 'config';
import {ProjectsTemplate, RailwayTemplate} from "./ArcgisConfig/PopupConfigs";

class AnalystMapPage extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/layers/MapImageLayer', 'esri/widgets/Legend'], {css: true})
            .then(([ArcGISMap, MapView, FeatureLayer, MapImageLayer, Legend]) => {

                const tiles = new MapImageLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/"
                });

                const layer1 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/1",
                    popupTemplate: ProjectsTemplate
                });

                const layer2 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/2",
                    popupTemplate: RailwayTemplate
                });

                const map = new ArcGISMap({
                    layers: [tiles, layer1, layer2],
                });

                this.view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [37, 55],
                    zoom: 12,
                });

                const legend = new Legend({
                    view: this.view,
                    layerInfos: [
                        {
                            layer: [layer1, layer2],
                            title: "МРТС"
                        }
                    ]
                });

                this.view.ui.add(legend, "bottom-right");

            });
    }

    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }

    render() {
        return (
            <div className="webmap my-5" ref={this.mapRef}/>
        );
    }
}

export default AnalystMapPage;
