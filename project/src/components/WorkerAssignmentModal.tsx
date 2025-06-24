import React from 'react';
import { X, Star, CheckCircle, RotateCcw } from 'lucide-react';

interface WorkerAssignmentModalProps {
  isOpen: boolean;
  worker: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    subscription: string;
  };
  service: {
    title: string;
    price: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WorkerAssignmentModal({ 
  isOpen, 
  worker, 
  service, 
  onConfirm, 
  onCancel 
}: WorkerAssignmentModalProps) {
  if (!isOpen) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getPriorityBadge = (subscription: string) => {
    if (subscription === 'premium') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Prioridad Premium
        </span>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Trabajador Asignado</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              {worker.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-2">{worker.name}</h4>
            
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center">
                {renderStars(worker.rating)}
                <span className="ml-2 text-gray-600 font-medium">{worker.rating}</span>
              </div>
            </div>

            {getPriorityBadge(worker.subscription)}
          </div>

          {/* Service Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-gray-900 mb-2">Servicio solicitado:</h5>
            <p className="text-gray-700 mb-2">{service.title}</p>
            <p className="text-2xl font-bold text-green-600">S/. {service.price}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirmar Trabajador
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Buscar Otro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}