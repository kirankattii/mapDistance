import React, { useState } from 'react';
import MapView from './components/MapView';
import MissionModal from './components/MissionModal';
import PolygonModal from './components/PolygonModal';

function App() {
  const [isMissionModalOpen, setMissionModalOpen] = useState(false);
  const [isPolygonModalOpen, setPolygonModalOpen] = useState(false);
  const [lineStringCoordinates, setLineStringCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
          onClick={() => setMissionModalOpen(true)}
        >
          Draw on Map
        </button>
      </div>
      <MapView
        setLineStringCoordinates={setLineStringCoordinates}
        setPolygonCoordinates={setPolygonCoordinates}
        onPolygonComplete={() => setPolygonModalOpen(true)}
      />
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setMissionModalOpen(false)}
        lineStringCoordinates={lineStringCoordinates}
      />
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onClose={() => setPolygonModalOpen(false)}
        polygonCoordinates={polygonCoordinates}
        onImport={() => {
          setMissionModalOpen(true);
          setPolygonModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
