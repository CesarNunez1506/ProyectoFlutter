import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Star, Clock, CheckCircle, Eye, User, TrendingUp } from 'lucide-react';
import { mockServices, mockWorkers } from '../data/mockData';
import WorkerNotificationModal from './WorkerNotificationModal';
import AvailabilityToggle from './AvailabilityToggle';
import TimelineView from './TimelineView';

interface WorkerDashboardProps {
  currentUser: any;
}

export default function WorkerDashboard({ currentUser }: WorkerDashboardProps) {
  const [activeTab, setActiveTab] = useState('available');
  const [isAvailable, setIsAvailable] = useState(currentUser.isAvailable || true);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<any>(null);

  // Mock worker stats
  const workerStats = {
    rating: 4.8,
    completedJobs: 127,
    earnings: 8540,
    responseTime: '2 horas'
  };

  const availableJobs = mockServices.filter(service => service.status === 'open');
  const myJobs = mockServices.filter(service => service.workerId === currentUser.id || service.workerName === currentUser.name);

  // Simulate receiving notifications when available
  useEffect(() => {
    if (!isAvailable) return;

    const interval = setInterval(() => {
      // Simulate random job notifications (20% chance every 10 seconds)
      if (Math.random() < 0.2 && availableJobs.length > 0) {
        const randomJob = availableJobs[Math.floor(Math.random() * availableJobs.length)];
        setCurrentNotification({
          id: randomJob.id,
          serviceTitle: randomJob.title,
          clientName: randomJob.clientName,
          price: randomJob.price,
          location: randomJob.location,
          timeLeft: 30
        });
        setShowNotification(true);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isAvailable, availableJobs]);

  const handleToggleAvailability = (available: boolean) => {
    setIsAvailable(available);
    if (!available) {
      setShowNotification(false);
      setCurrentNotification(null);
    }
  };

  const handleAcceptJob = () => {
    setShowNotification(false);
    alert('¡Trabajo aceptado! El cliente será notificado.');
    setCurrentNotification(null);
  };

  const handleRejectJob = () => {
    setShowNotification(false);
    setCurrentNotification(null);
  };

  const handleJobTimeout = () => {
    setShowNotification(false);
    setCurrentNotification(null);
    alert('Tiempo agotado. El trabajo fue asignado a otro trabajador.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleApplyJob = (jobId: string) => {
    alert('¡Solicitud enviada! El cliente será notificado.');
  };

  const handleUpdateStatus = (jobId: string, newStatus: string) => {
    alert(`Estado actualizado a: ${newStatus}`);
  };

  const getPriorityBadge = (subscription: string) => {
    if (subscription === 'premium') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Prioridad Premium
        </span>
      );
    } else if (subscription === 'basic') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Prioridad Básica
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Panel del Trabajador</h1>
            <p className="text-gray-600 mt-2">Bienvenido, {currentUser.name}</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-4 lg:mt-0">
            {currentUser.verified && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit mb-2 lg:mb-0">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verificado
              </span>
            )}
            {getPriorityBadge(currentUser.subscription)}
            <div className="flex items-center mt-2 lg:mt-0">
              {renderStars(workerStats.rating)}
              <span className="ml-2 text-gray-600">({workerStats.rating})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <AvailabilityToggle 
        isAvailable={isAvailable} 
        onToggle={handleToggleAvailability} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg">
              <Star className="h-4 w-4 lg:h-6 lg:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Calificación</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{workerStats.rating}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
              <CheckCircle className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Trabajos Completados</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{workerStats.completedJobs}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Ganancias (S/.)</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{workerStats.earnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 lg:p-3 rounded-lg">
              <Clock className="h-4 w-4 lg:h-6 lg:w-6 text-purple-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Tiempo de Respuesta</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{workerStats.responseTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Trabajos Disponibles
          </button>
          <button
            onClick={() => setActiveTab('my-jobs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'my-jobs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mis Trabajos
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Línea de Tiempo
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mi Perfil
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'available' && (
        <div className="space-y-4 lg:space-y-6">
          {availableJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.description}</p>
                </div>
                <div className="text-left lg:text-right mt-2 lg:mt-0 lg:ml-4">
                  <p className="text-xl lg:text-2xl font-bold text-green-600">S/. {job.price}</p>
                  <p className="text-sm text-gray-500">Presupuesto</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Publicado: {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Cliente: {job.clientName}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium w-fit mb-2 lg:mb-0">
                  {job.category}
                </span>
                <div className="flex flex-col lg:flex-row gap-2">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </button>
                  <button
                    onClick={() => handleApplyJob(job.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'my-jobs' && (
        <div className="space-y-4 lg:space-y-6">
          {myJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.description}</p>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-2 lg:mt-0">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit mb-2 lg:mb-0 ${getStatusColor(job.status)}`}>
                    {getStatusIcon(job.status)}
                    <span className="ml-1 capitalize">
                      {job.status === 'assigned' ? 'Asignado' : job.status === 'in-progress' ? 'En Proceso' : 'Completado'}
                    </span>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-lg lg:text-xl font-bold text-green-600">S/. {job.price}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Cliente: {job.clientName}
                </div>
              </div>

              {job.status !== 'completed' && (
                <div className="flex flex-col lg:flex-row gap-2">
                  {job.status === 'assigned' && (
                    <button
                      onClick={() => handleUpdateStatus(job.id, 'in-progress')}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Iniciar Trabajo
                    </button>
                  )}
                  {job.status === 'in-progress' && (
                    <button
                      onClick={() => handleUpdateStatus(job.id, 'completed')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Marcar como Completado
                    </button>
                  )}
                </div>
              )}

              {job.status === 'completed' && job.rating && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Calificación del cliente:</span>
                    <div className="flex">
                      {renderStars(job.rating)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {myJobs.map((job) => (
            <div key={job.id}>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
              {job.timeline && (
                <TimelineView timeline={job.timeline} currentStatus={job.status} />
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Profile Info */}
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Perfil</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={currentUser.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Especialidades
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Plomería</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Electricidad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calificación Promedio</span>
                <div className="flex items-center">
                  {renderStars(workerStats.rating)}
                  <span className="ml-2 font-semibold">{workerStats.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trabajos Completados</span>
                <span className="font-semibold">{workerStats.completedJobs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ganancias Totales</span>
                <span className="font-semibold text-green-600">S/. {workerStats.earnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tiempo de Respuesta</span>
                <span className="font-semibold">{workerStats.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Worker Notification Modal */}
      <WorkerNotificationModal
        isOpen={showNotification}
        notification={currentNotification}
        onAccept={handleAcceptJob}
        onReject={handleRejectJob}
        onTimeout={handleJobTimeout}
      />
    </div>
  );
}