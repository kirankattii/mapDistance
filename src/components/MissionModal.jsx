import React from 'react';
import Modal from 'react-modal';


const haversineDistance = ([lon1, lat1], [lon2, lat2]) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371000;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const MissionModal = ({ isOpen, onClose, lineStringCoordinates }) => {
  // Calculate distances for each segment
  const distances = lineStringCoordinates.slice(1).map((coord, index) => {
    return haversineDistance(lineStringCoordinates[index], coord);
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded p-6 w-1/2 mx-auto mt-20 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Mission Planner</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">WP</th>
            <th className="border p-2">Coordinates</th>
            <th className="border p-2">Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {lineStringCoordinates.map((coord, index) => (
            <tr key={index}>
              <td className="border p-2">{`WP${String(index).padStart(2, '0')}`}</td>
              <td className="border p-2">{coord.join(', ')}</td>
              <td className="border p-2">
                {index === 0 ? 'N/A' : distances[index - 1].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded shadow mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default MissionModal;
