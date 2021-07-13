import React, { useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

export const TMap = ({className, twisters}) => {
    const _layerTwisters = React.useRef(new GraphicsLayer());
    useEffect(
        () => {
            console.log("map::creating map");
            const map = new Map({ basemap: "gray-vector"});
            map.add(_layerTwisters.current);
            new MapView(
                {
                    map: map, 
                    container: "map", 
                    extent: new Extent({xmin: -124, ymin: 24, xmax: -67, ymax:50})
                }
            );
            return () => {};
        },
        []
    );        
    useEffect(
        () => {
            console.log("map::populating layer");
            _layerTwisters.current.removeAll();
            twisters.forEach((item, i) => {
                _layerTwisters.current.add(
                    new Graphic({geometry: new Point(item.geometry.x, item.geometry.y)})
                );
            });
            return () => {};
        },
        [twisters]
    );        

    return (<div id="map" className={className}></div>);
}