import React from 'react';
import { CheckCircle, Clock, User, Calendar } from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelineViewProps {
  timeline: TimelineEvent[];
  currentStatus: string;
}

export default function TimelineView({ timeline, currentStatus }: TimelineViewProps) {
  const getStatusIcon = (status: string, isCompleted: boolean) => {
    const iconClass = `h-6 w-6 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`;
    
    switch (status) {
      case 'requested':
        return <User className={iconClass} />;
      case 'assigned':
        return <CheckCircle className={iconClass} />;
      case 'in-progress':
        return <Clock className={iconClass} />;
      case 'completed':
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'requested':
        return 'Solicitado';
      case 'assigned':
        return 'Asignado';
      case 'in-progress':
        return 'En Curso';
      case 'completed':
        return 'Finalizado';
      default:
        return status;
    }
  };

  const isStatusCompleted = (status: string) => {
    const statusOrder = ['requested', 'assigned', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);
    return statusIndex <= currentIndex;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('es-PE'),
      time: date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Línea de Tiempo
      </h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {timeline.map((event, index) => {
            const isCompleted = isStatusCompleted(event.status);
            const { date, time } = formatDate(event.timestamp);
            
            return (
              <div key={event.id} className="relative flex items-start">
                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                  isCompleted 
                    ? 'bg-green-100 border-green-200' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  {getStatusIcon(event.status, isCompleted)}
                </div>
                
                {/* Content */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold ${
                      isCompleted ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {getStatusLabel(event.status)}
                    </h4>
                    <div className="text-sm text-gray-500">
                      <div>{date}</div>
                      <div>{time}</div>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${
                    isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {event.description}
                  </p>
                  
                  {event.actionBy && (
                    <p className={`text-xs mt-1 ${
                      isCompleted ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      Por: {event.actionBy}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}