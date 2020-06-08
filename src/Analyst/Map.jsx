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

                const layer = new MapImageLayer({
                    url: config.arcGisMapServerUrl,
                    // sublayers:
                    //     [
                    //         {
                    //             id: 1,
                    //             // popupEnabled: true,
                    //             // popupTemplate: ProjectsTemplate
                    //         },
                    //         {
                    //             id: 2,
                    //             // popupEnabled: true,
                    //             // popupTemplate: ProjectsTemplate
                    //         },
                    //         {
                    //             id: 3,
                    //             // popupEnabled: true,
                    //             // popupTemplate: ProjectsTemplate
                    //         },
                    //     ]
                });

                const map = new ArcGISMap({
                    // basemap: 'gray',
                    layers: [layer],
                    zoom: 12,
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
                            layer: layer,
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
