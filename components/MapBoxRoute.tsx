import React from 'react';
import { Layer, Source } from 'react-map-gl';

type LineStringGeometry = {
    type: 'LineString';
    coordinates: number[][];
};

type Feature = {
    type: 'Feature';
    properties: {};
    geometry: LineStringGeometry;
};

function MapBoxRoute(props: any) {
    const data: Feature = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: props.coordinates,
        },
    };

    return (
        <Source type='geojson' data={data}>
            <Layer
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'square' }}
                paint={{ 'line-color': '#f3c4dc', 'line-width': 4 }}
            />
        </Source>
    );
}

export default MapBoxRoute;
