import React, { useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

export const TMap = ({className, twisters, onSelectTwister:reportSelected}) => {

    const _layerTwisters = React.useRef(new GraphicsLayer());
    const _layerHighlight = React.useRef(new GraphicsLayer());
    const _layerPinned = React.useRef(new GraphicsLayer());
    const _selected = React.useRef(null);
    const _reportSelected = React.useRef(null);

    useEffect(
        () => {

            console.log("map::creating map");

            const map = new Map({ basemap: "gray-vector"});
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
                            } else {
                                document.querySelector("#map").style.cursor = "default";
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
            _layerHighlight.current.removeAll();
            _layerPinned.current.removeAll();
            twisters.forEach((item, i) => {
                _layerTwisters.current.add(
                    new Graphic({
                        geometry: new Point(item.geometry.x, item.geometry.y),
                        symbol: createSymbol(item.attributes.F_Scale),
                        attributes: item.attributes
                    })
                );
            });
            return () => {};
        },
        [twisters]
    );
    
    useEffect(
        ()=> {
            _reportSelected.current = reportSelected;
        },
        [reportSelected]
    )

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