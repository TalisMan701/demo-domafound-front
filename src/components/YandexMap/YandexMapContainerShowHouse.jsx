import React from "react";
import {YMaps, Map, Polygon, Placemark} from "react-yandex-maps";

function YandexMapContainerShowHouse(props) {
    let coordinate = [props.x,props.y]
    console.log(coordinate)
    return (
        <YMaps>
            <Map
                defaultState={{
                    center: coordinate,
                    zoom: 15
                }}
                modules={["geoObject.addon.editor", "layout.ImageWithContent"]}
                width="100%"
                height="100%"
            >
                <Placemark
                    geometry={coordinate}
                />
            </Map>
        </YMaps>
    );
}

export default YandexMapContainerShowHouse;