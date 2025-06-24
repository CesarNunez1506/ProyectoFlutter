import React from 'react';
import { Check, Star, Crown, Shield } from 'lucide-react';
import { subscriptionPlans } from '../data/mockData';

interface SubscriptionsPageProps {
  currentUser: any;
  onUpdateSubscription: (planId: string) => void;
}

export default function SubscriptionsPage({ currentUser, onUpdateSubscription }: SubscriptionsPageProps) {
  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      onUpdateSubscription(planId);
      return;
    }
    
    // Mock payment process
    const confirmPayment = window.confirm(
      `¿Confirmas que deseas suscribirte al plan ${subscriptionPlans.find(p => p.id === planId)?.name}?`
    );
    
    if (confirmPayment) {
      onUpdateSubscription(planId);
      alert('¡Suscripción activada exitosamente!');
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Shield className="h-8 w-8" />;
      case 'basic':
        return <Star className="h-8 w-8" />;
      case 'premium':
        return <Crown className="h-8 w-8" />;
      default:
        return <Shield className="h-8 w-8" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'text-gray-600 bg-gray-100';
      case 'basic':
        return 'text-blue-600 bg-blue-100';
      case 'premium':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getBorderColor = (planId: string, isPopular: boolean) => {
    if (isPopular) return 'border-purple-500 ring-2 ring-purple-200';
    if (currentUser?.subscription === planId) return 'border-green-500 ring-2 ring-green-200';
    return 'border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Planes de Suscripción
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades y lleva tu experiencia 
          en ServiPerú al siguiente nivel
        </p>
        {currentUser && (
          <div className="mt-4 inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-blue-800">
              Plan actual: <span className="font-semibold capitalize">{currentUser.subscription}</span>
            </span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl shadow-sm border-2 ${getBorderColor(plan.id, plan.popular)} relative overflow-hidden`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 text-sm font-medium">
                ⭐ Más Popular
              </div>
            )}
            
            <div className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getPlanColor(plan.id)} mb-4`}>
                  {getPlanIcon(plan.id)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">S/. {plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-600">/mes</span>}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={currentUser?.subscription === plan.id}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  currentUser?.subscription === plan.id
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentUser?.subscription === plan.id
                  ? 'Plan Actual'
                  : plan.price === 0
                  ? 'Seleccionar Plan Gratis'
                  : 'Suscribirse Ahora'
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Comparación Detallada</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-900">Características</th>
                <th className="text-center py-4 px-6 font-medium text-gray-900">Gratis</th>
                <th className="text-center py-4 px-6 font-medium text-gray-900">Básico</th>
                <th className="text-center py-4 px-6 font-medium text-gray-900">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-6 text-gray-900">Servicios por mes</td>
                <td className="text-center py-4 px-6 text-gray-600">2</td>
                <td className="text-center py-4 px-6 text-gray-600">10</td>
                <td className="text-center py-4 px-6 text-gray-600">Ilimitados</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900">Búsqueda avanzada</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-green-500">✓</td>
                <td className="text-center py-4 px-6 text-green-500">✓</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900">Trabajadores verificados premium</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-green-500">✓</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900">Garantía de servicio</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-green-500">✓</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900">Soporte</td>
                <td className="text-center py-4 px-6 text-gray-600">Email</td>
                <td className="text-center py-4 px-6 text-gray-600">Prioritario</td>
                <td className="text-center py-4 px-6 text-gray-600">24/7</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900">Descuentos exclusivos</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-red-500">✗</td>
                <td className="text-center py-4 px-6 text-green-500">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Preguntas Frecuentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              ¿Puedo cambiar de plan en cualquier momento?
            </h4>
            <p className="text-gray-600">
              Sí, puedes cambiar tu plan en cualquier momento. Los cambios se aplicarán 
              inmediatamente y se ajustará la facturación según corresponda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              ¿Qué incluye la garantía de servicio?
            </h4>
            <p className="text-gray-600">
              Si no estás satisfecho con el servicio recibido, trabajaremos contigo 
              para solucionarlo o te reembolsaremos tu dinero.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              ¿Hay comisiones adicionales?
            </h4>
            <p className="text-gray-600">
              Solo cobramos una pequeña comisión por transacción completada. 
              No hay costos ocultos ni tarifas adicionales.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              ¿Cómo funciona el plan gratuito?
            </h4>
            <p className="text-gray-600">
              El plan gratuito te permite publicar hasta 2 servicios por mes 
              y acceder a funciones básicas de la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}