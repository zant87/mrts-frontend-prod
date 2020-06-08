import React from 'react';
import {loadModules} from 'esri-loader';
import config from 'config';
import {ProjectsTemplate} from "./ArcgisConfig/PopupConfigs";

class AnalystMapPage extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/layers/MapImageLayer', 'esri/widgets/Legend'], {css: true})
            .then(([ArcGISMap, MapView, FeatureLayer, MapImageLayer, Legend]) => {

                const titles = new MapImageLayer({
                    url: config.arcGisMapServerUrl
                });

                const layer1 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "1",
                    popupTemplate: ProjectsTemplate
                });

                const layer2 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "2",
                    popupTemplate: ProjectsTemplate
                });

                const layer3 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "3",
                    popupTemplate: ProjectsTemplate
                });

                const layer4 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "4",
                    popupTemplate: ProjectsTemplate
                });

                const layer5 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "5",
                    popupTemplate: ProjectsTemplate
                });

                const layer6 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "6",
                    popupTemplate: ProjectsTemplate
                });

                const map = new ArcGISMap({
                    layers: [titles, layer1, layer2, layer3, layer4, layer5, layer6],
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
                            layer: titles,
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
