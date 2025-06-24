import { Service, Worker, SubscriptionPlan, TimelineEvent } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Plomería - Reparación de grifo',
    description: 'Necesito reparar un grifo que gotea en la cocina',
    category: 'Plomería',
    location: 'San Isidro, Lima',
    price: 80,
    clientId: '1',
    clientName: 'María García',
    status: 'open',
    createdAt: '2024-01-15T10:00:00Z',
    timeline: [
      {
        id: '1',
        status: 'requested',
        timestamp: '2024-01-15T10:00:00Z',
        description: 'Servicio solicitado',
        actionBy: 'María García'
      }
    ]
  },
  {
    id: '2',
    title: 'Jardinería - Mantenimiento de jardín',
    description: 'Poda de árboles y limpieza general del jardín',
    category: 'Jardinería',
    location: 'Miraflores, Lima',
    price: 120,
    clientId: '2',
    clientName: 'Carlos López',
    status: 'assigned',
    workerId: '101',
    workerName: 'Juan Pérez',
    workerAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    workerRating: 4.8,
    createdAt: '2024-01-14T09:00:00Z',
    assignedAt: '2024-01-14T09:15:00Z',
    timeline: [
      {
        id: '1',
        status: 'requested',
        timestamp: '2024-01-14T09:00:00Z',
        description: 'Servicio solicitado',
        actionBy: 'Carlos López'
      },
      {
        id: '2',
        status: 'assigned',
        timestamp: '2024-01-14T09:15:00Z',
        description: 'Trabajador asignado',
        actionBy: 'Juan Pérez'
      }
    ]
  },
  {
    id: '3',
    title: 'Pintura - Habitación principal',
    description: 'Pintar habitación de 15m² con pintura látex',
    category: 'Pintura',
    location: 'Surco, Lima',
    price: 200,
    clientId: '3',
    clientName: 'Ana Torres',
    status: 'completed',
    workerId: '102',
    workerName: 'Pedro Silva',
    workerAvatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    workerRating: 4.9,
    createdAt: '2024-01-10T08:00:00Z',
    assignedAt: '2024-01-10T08:20:00Z',
    startedAt: '2024-01-10T14:00:00Z',
    completedAt: '2024-01-10T18:00:00Z',
    rating: 5,
    timeline: [
      {
        id: '1',
        status: 'requested',
        timestamp: '2024-01-10T08:00:00Z',
        description: 'Servicio solicitado',
        actionBy: 'Ana Torres'
      },
      {
        id: '2',
        status: 'assigned',
        timestamp: '2024-01-10T08:20:00Z',
        description: 'Trabajador asignado',
        actionBy: 'Pedro Silva'
      },
      {
        id: '3',
        status: 'in-progress',
        timestamp: '2024-01-10T14:00:00Z',
        description: 'Trabajo iniciado',
        actionBy: 'Pedro Silva'
      },
      {
        id: '4',
        status: 'completed',
        timestamp: '2024-01-10T18:00:00Z',
        description: 'Trabajo completado',
        actionBy: 'Pedro Silva'
      }
    ]
  }
];

export const mockWorkers: Worker[] = [
  {
    id: '101',
    name: 'Juan Pérez',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.8,
    verified: true,
    categories: ['Plomería', 'Electricidad'],
    location: 'Lima Norte',
    completedJobs: 127,
    priceRange: 'S/. 60-150/hora',
    isAvailable: true,
    subscription: 'premium'
  },
  {
    id: '102',
    name: 'Pedro Silva',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.9,
    verified: true,
    categories: ['Pintura', 'Reparaciones'],
    location: 'Lima Sur',
    completedJobs: 89,
    priceRange: 'S/. 50-120/hora',
    isAvailable: true,
    subscription: 'basic'
  },
  {
    id: '103',
    name: 'María Rodríguez',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.7,
    verified: true,
    categories: ['Limpieza', 'Jardinería'],
    location: 'Lima Centro',
    completedJobs: 156,
    priceRange: 'S/. 40-100/hora',
    isAvailable: false,
    subscription: 'free'
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    priority: 3,
    features: [
      'Hasta 2 servicios por mes',
      'Búsqueda básica',
      'Soporte por email'
    ]
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 29,
    priority: 2,
    features: [
      'Hasta 10 servicios por mes',
      'Filtros avanzados',
      'Prioridad en búsqueda',
      'Soporte prioritario'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59,
    popular: true,
    priority: 1,
    features: [
      'Servicios ilimitados',
      'Trabajadores verificados premium',
      'Garantía de servicio',
      'Soporte 24/7',
      'Descuentos exclusivos',
      'Prioridad máxima en asignaciones'
    ]
  }
];

export const serviceCategories = [
  { name: 'Plomería', icon: 'Wrench' },
  { name: 'Electricidad', icon: 'Zap' },
  { name: 'Pintura', icon: 'Palette' },
  { name: 'Jardinería', icon: 'Flower' },
  { name: 'Limpieza', icon: 'Sparkles' },
  { name: 'Carpintería', icon: 'Hammer' },
  { name: 'Reparaciones', icon: 'Settings' },
  { name: 'Mudanza', icon: 'Truck' }
];