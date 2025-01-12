import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { Draw } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';

const MapView = ({ setLineStringCoordinates, setPolygonCoordinates, onPolygonComplete }) => {
  const mapElement = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(initialMap);
    return () => initialMap.setTarget(undefined);
  }, []);

  const addInteraction = (type) => {
    if (!map) return;

    const source = new VectorSource();
    const layer = new VectorLayer({ source });
    map.addLayer(layer);

    const drawInteraction = new Draw({
      source,
      type,
    });

    map.addInteraction(drawInteraction);

    drawInteraction.on('drawend', (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      if (type === 'LineString') {
        setLineStringCoordinates(coordinates);
      } else if (type === 'Polygon') {
        setPolygonCoordinates(coordinates);
        onPolygonComplete();
      }
      map.removeInteraction(drawInteraction);
    });
  };

  return (
    <div>
      <div ref={mapElement} className="w-full h-[500px] border rounded-lg"></div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
          onClick={() => addInteraction('LineString')}
        >
          Draw LineString
        </button>
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
          onClick={() => addInteraction('Polygon')}
        >
          Draw Polygon
        </button>
      </div>
    </div>
  );
};

export default MapView;
