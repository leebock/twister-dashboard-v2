import React, { useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Color from "@arcgis/core/Color";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import Tooltip from "./Tooltip";
import {getDisplayDate} from "../services/DateFuncs";

export const TMap = ({
    className, 
    twisters, 
    onSelectTwister:reportSelected, 
    onExtentChange:reportExtent
    }) => {

    const _layerPaths = React.useRef(new GraphicsLayer({minScale: 10000000}));
    const _layerTwisters = React.useRef(new GraphicsLayer());
    const _layerHighlight = React.useRef(new GraphicsLayer());
    const _layerPinned = React.useRef(new GraphicsLayer());
    const _selected = React.useRef(null);
    const _reportSelected = React.useRef(reportSelected);
    const _reportExtent = React.useRef(reportExtent);
 
    useEffect(
        () => {

            console.log("map::creating map");

            const map = new Map({ basemap: "gray-vector"});
            map.add(_layerPaths.current);
            map.add(_layerTwisters.current);
            map.add(_layerHighlight.current);
            map.add(_layerPinned.current);

            const view = new MapView(
                {
                    map: map, 
                    container: "map", 
                    extent: new Extent({xmin: -124, ymin: 24, xmax: -67, ymax:50})
                }
            );

            view.when(
                ()=> {
                    whenTrue(
                        view, 
                        "stationary", 
                        ()=>{
                            _reportExtent.current(
                                webMercatorToGeographic(view.extent)
                                .normalize()
                                .pop()
                            );
                        }
                    )
                }
            );

            // create homemade tooltip

            let toolTip = new Tooltip(view.container);            

            view.on(
                "pointer-move",         
                (event) => {
                    view.hitTest(event, {include: _layerTwisters.current}).then(
                        function(response) {
                            _layerHighlight.current.removeAll();
                            if (response.results.length > 0) {
                                document.querySelector("#map").style.cursor = "pointer";
                                const graphic = response.results.shift().graphic;
                                _layerHighlight.current.add(createHighlight(graphic));
                                const screenPoint = view.toScreen(
                                    new Point(
                                        graphic.attributes.Starting_Long, 
                                        graphic.attributes.Starting_Lat
                                    )
                                );
                                toolTip.show(
                                    getDisplayDate(graphic.attributes.Date)+
                                    "<br>Scale: <b>"+graphic.attributes.F_Scale+"</b>", 
                                    screenPoint.x, screenPoint.y
                                );
                            } else {
                                document.querySelector("#map").style.cursor = "default";
                                toolTip.hide();
                            }
                        }
                    );        
                }        
            );

            view.on(
                "click", 
                (event) => {
                    view.hitTest(event, {include: _layerTwisters.current}).then(
                        function(response) {
                            document.querySelector("#map").style.cursor = "default";
                            toolTip.hide();
                            _layerHighlight.current.removeAll();
                            if (response.results.length === 0) {
                                _selected.current = null;
                            } else {
                                _selected.current = response.results.shift().graphic;
                            }
                            _reportSelected.current(_selected.current ? _selected.current.attributes : null);
                            updatePinned();
                        }
                    );
                }
            );

            const updatePinned = () =>
            {
                _layerPinned.current.removeAll();
                if (_selected.current) {
                    _layerPinned.current.add(createPinned(_selected.current));
                }
            }

            const createPinned = (graphic) => 
            {
                const clone = graphic.clone();
                const fScale = clone.attributes.F_Scale; 
                clone.symbol = createSymbol(fScale, true);
                return clone;       
            }
        
            return () => {};
        },
        []
    );

    useEffect(
        () => {
            console.log("map::populating layer");
            _layerTwisters.current.removeAll();
            _layerPaths.current.removeAll();
            _layerHighlight.current.removeAll();
            _layerPinned.current.removeAll();

            const colors = [
                new Color("#6ed1b9"),
                new Color("#1db3ac"),
                new Color("#02a3ab"),
                new Color("#0593b6"),
                new Color("#0580af"),		
                new Color("#035995")	
            ];

            twisters.forEach((item, i) => {
                _layerTwisters.current.add(
                    new Graphic({
                        geometry: new Point(item.Starting_Long, item.Starting_Lat),
                        symbol: createSymbol(item.F_Scale),
                        attributes: item
                    })
                );
                _layerPaths.current.add(
                    new Graphic({
                        geometry: new Polyline([
                            [item.Starting_Long, item.Starting_Lat], 
                            [item.End_Long, item.End_Lat]
                        ]),
                        symbol: {
                            type: "simple-line",  // autocasts as SimpleLineSymbol()
                            color: colors[item.F_Scale],
                            width: item.F_Scale+1
                        }
                    })
                )
            });
            return () => {};
        },
        [twisters]
    );
 
    const createHighlight = (graphic) =>
    {
        const clone = graphic.clone();
        const sym = graphic.symbol.clone();
        sym.width = sym.width*1.25;
        sym.height = sym.height*1.25;
        clone.symbol = sym;
        return clone;       
    }

    const createSymbol = (fScale, select) => {
        const size = [15,20,22,27,32,36][fScale];
        return {
            type: "picture-marker",
            url: "Tornado_"+fScale+"a"+(select ? "-select" : "")+".png",
            width: size+"px",
            height: size+"px"
        }
    }

    return (<div id="map" className={className}></div>);

}