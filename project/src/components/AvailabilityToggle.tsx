import React from 'react';
import { Power, PowerOff } from 'lucide-react';

interface AvailabilityToggleProps {
  isAvailable: boolean;
  onToggle: (available: boolean) => void;
}

export default function AvailabilityToggle({ isAvailable, onToggle }: AvailabilityToggleProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${
            isAvailable ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {isAvailable ? (
              <Power className="h-5 w-5 text-green-600" />
            ) : (
              <PowerOff className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Estado de Disponibilidad</h3>
            <p className="text-sm text-gray-600">
              {isAvailable 
                ? 'Estás recibiendo nuevas asignaciones' 
                : 'No recibirás nuevas asignaciones'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onToggle(!isAvailable)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isAvailable ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isAvailable ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      <div className={`mt-3 px-3 py-2 rounded-lg text-sm ${
        isAvailable 
          ? 'bg-green-50 text-green-800' 
          : 'bg-gray-50 text-gray-600'
      }`}>
        {isAvailable ? (
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Disponible para trabajos
          </span>
        ) : (
          <span className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            No disponible
          </span>
        )}
      </div>
    </div>
  );
}