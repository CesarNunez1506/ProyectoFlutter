import React, { useState } from 'react';
import { Plus, MapPin, Calendar, Star, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import { mockServices, mockWorkers } from '../data/mockData';
import WorkerAssignmentModal from './WorkerAssignmentModal';
import TimelineView from './TimelineView';

interface ClientDashboardProps {
  currentUser: any;
}

export default function ClientDashboard({ currentUser }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('services');
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [assignedWorker, setAssignedWorker] = useState<any>(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    price: ''
  });

  const userServices = mockServices.filter(service => service.clientId === currentUser.id || service.clientName === currentUser.name);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate automatic worker assignment
    const availableWorkers = mockWorkers.filter(worker => worker.isAvailable);
    
    if (availableWorkers.length > 0) {
      // Sort by subscription priority (premium first)
      const sortedWorkers = availableWorkers.sort((a, b) => {
        const priorityA = a.subscription === 'premium' ? 1 : a.subscription === 'basic' ? 2 : 3;
        const priorityB = b.subscription === 'premium' ? 1 : b.subscription === 'basic' ? 2 : 3;
        return priorityA - priorityB;
      });
      
      const selectedWorker = sortedWorkers[0];
      setAssignedWorker(selectedWorker);
      setSelectedService(newService);
      setShowAssignmentModal(true);
    } else {
      alert('No hay trabajadores disponibles en este momento. Intenta más tarde.');
    }
  };

  const handleConfirmWorker = () => {
    console.log('Worker confirmed:', assignedWorker);
    setShowAssignmentModal(false);
    setShowNewServiceForm(false);
    setNewService({ title: '', description: '', category: '', location: '', price: '' });
    alert('¡Servicio publicado y trabajador asignado exitosamente!');
  };

  const handleCancelAssignment = () => {
    setShowAssignmentModal(false);
    // Could implement logic to find another worker here
    alert('Buscando otro trabajador disponible...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Panel del Cliente</h1>
        <p className="text-gray-600 mt-2">Bienvenido, {currentUser.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <Plus className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Servicios Activos</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {userServices.filter(s => s.status !== 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
              <CheckCircle className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Completados</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {userServices.filter(s => s.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg">
              <Star className="h-4 w-4 lg:h-6 lg:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Calificación</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">4.9</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 lg:p-3 rounded-lg">
              <User className="h-4 w-4 lg:h-6 lg:w-6 text-purple-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Plan</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900 capitalize">{currentUser.subscription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('services')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mis Servicios
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
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Historial
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'services' && (
        <div>
          {/* Create Service Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowNewServiceForm(!showNewServiceForm)}
              className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Publicar Nuevo Servicio
            </button>
          </div>

          {/* New Service Form */}
          {showNewServiceForm && (
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo Servicio</h3>
              <form onSubmit={handleCreateService} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título del Servicio
                    </label>
                    <input
                      type="text"
                      required
                      value={newService.title}
                      onChange={(e) => setNewService({...newService, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Reparación de grifo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      required
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Plomería">Plomería</option>
                      <option value="Electricidad">Electricidad</option>
                      <option value="Pintura">Pintura</option>
                      <option value="Jardinería">Jardinería</option>
                      <option value="Limpieza">Limpieza</option>
                      <option value="Carpintería">Carpintería</option>
                      <option value="Reparaciones">Reparaciones</option>
                      <option value="Mudanza">Mudanza</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe el trabajo que necesitas..."
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      required
                      value={newService.location}
                      onChange={(e) => setNewService({...newService, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: San Isidro, Lima"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Presupuesto (S/.)
                    </label>
                    <input
                      type="number"
                      required
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Publicar Servicio
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewServiceForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Services List */}
          <div className="space-y-4 lg:space-y-6">
            {userServices.map((service) => (
              <div key={service.id} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className={`mt-2 lg:mt-0 lg:ml-4 px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                    <span className="ml-1 capitalize">{service.status === 'open' ? 'Abierto' : service.status === 'assigned' ? 'Asignado' : service.status === 'in-progress' ? 'En Proceso' : 'Completado'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {service.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(service.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-green-600">S/. {service.price}</span>
                  </div>
                </div>

                {service.workerName && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                      <div>
                        <p className="font-medium text-gray-900">Trabajador asignado: {service.workerName}</p>
                        {service.status === 'completed' && service.rating && (
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600 mr-2">Tu calificación:</span>
                            <div className="flex">
                              {renderStars(service.rating)}
                            </div>
                          </div>
                        )}
                      </div>
                      {service.status === 'completed' && !service.rating && (
                        <button className="mt-2 lg:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Calificar
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {userServices.map((service) => (
            <div key={service.id}>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              {service.timeline && (
                <TimelineView timeline={service.timeline} currentStatus={service.status} />
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4 lg:space-y-6">
          {userServices.filter(service => service.status === 'completed').map((service) => (
            <div key={service.id} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
                <div className="text-left lg:text-right mt-2 lg:mt-0">
                  <p className="text-sm text-gray-500">Completado el</p>
                  <p className="font-medium">{new Date(service.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {service.location}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-green-600">S/. {service.price}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium">Trabajador: {service.workerName}</span>
                </div>
              </div>

              {service.rating && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Tu calificación:</span>
                  <div className="flex">
                    {renderStars(service.rating)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Worker Assignment Modal */}
      <WorkerAssignmentModal
        isOpen={showAssignmentModal}
        worker={assignedWorker}
        service={selectedService}
        onConfirm={handleConfirmWorker}
        onCancel={handleCancelAssignment}
      />
    </div>
  );
}