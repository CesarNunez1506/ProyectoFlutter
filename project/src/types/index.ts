export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'worker';
  avatar?: string;
  rating?: number;
  verified?: boolean;
  subscription?: 'free' | 'basic' | 'premium';
  isAvailable?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  clientId: string;
  clientName: string;
  status: 'open' | 'assigned' | 'in-progress' | 'completed';
  workerId?: string;
  workerName?: string;
  workerAvatar?: string;
  workerRating?: number;
  createdAt: string;
  assignedAt?: string;
  startedAt?: string;
  completedAt?: string;
  rating?: number;
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  status: 'requested' | 'assigned' | 'in-progress' | 'completed';
  timestamp: string;
  description: string;
  actionBy?: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  verified: boolean;
  categories: string[];
  location: string;
  completedJobs: number;
  priceRange: string;
  isAvailable: boolean;
  subscription: 'free' | 'basic' | 'premium';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  priority?: number;
}

export interface WorkerNotification {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  price: number;
  location: string;
  timeLeft: number;
  isActive: boolean;
}