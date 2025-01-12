import React from 'react';
import Modal from 'react-modal';

const PolygonModal = ({ isOpen, onClose, polygonCoordinates, onImport }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg p-6 w-3/4 mx-auto mt-16 shadow-lg border"
    >
      <h2 className="text-2xl font-bold mb-6">Polygon Waypoints</h2>
      {polygonCoordinates.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">WP</th>
              <th className="border p-2">Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {polygonCoordinates.map((coord, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="border p-2">{`WP${String(index).padStart(2, '0')}`}</td>
                <td className="border p-2">{coord.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No polygon coordinates available.</p>
      )}
      <div className="flex justify-between mt-6">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
          onClick={onImport}
        >
          Import Points
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PolygonModal;
