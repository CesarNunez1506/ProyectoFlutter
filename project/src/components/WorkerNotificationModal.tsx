import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Clock, CheckCircle, X } from 'lucide-react';

interface WorkerNotificationModalProps {
  isOpen: boolean;
  notification: {
    id: string;
    serviceTitle: string;
    clientName: string;
    price: number;
    location: string;
    timeLeft: number;
  } | null;
  onAccept: () => void;
  onReject: () => void;
  onTimeout: () => void;
}

export default function WorkerNotificationModal({ 
  isOpen, 
  notification, 
  onAccept, 
  onReject, 
  onTimeout 
}: WorkerNotificationModalProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isOpen || !notification) return;

    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, notification, onTimeout]);

  if (!isOpen || !notification) return null;

  const progressPercentage = (timeLeft / 30) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-pulse">
        {/* Header with Timer */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Bell className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">¡Nuevo Servicio Disponible!</h3>
            </div>
            <div className="text-2xl font-bold">{timeLeft}s</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-blue-800 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{notification.serviceTitle}</h4>
            
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{notification.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>Cliente: {notification.clientName}</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Pago estimado</p>
                <p className="text-3xl font-bold text-green-600">S/. {notification.price}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onAccept}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Aceptar Trabajo
            </button>
            <button
              onClick={onReject}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <X className="h-5 w-5 mr-2" />
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}