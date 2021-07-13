import React, { useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";

export const TMap = ({className}) => {
    useEffect(
        () => {
            console.log("map::creating map");
            const map = new Map({ basemap: "gray-vector"});
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
    return (<div id="map" className={className}></div>);
}