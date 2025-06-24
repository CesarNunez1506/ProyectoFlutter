import React from 'react';
import { Search, Users, Shield, Star, CheckCircle, Wrench, Zap, Palette, Flower, Sparkles, Hammer, Settings, Truck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: 'Trabajadores Verificados',
      description: 'Todos nuestros trabajadores pasan por verificación de identidad y antecedentes'
    },
    {
      icon: Star,
      title: 'Calificaciones Reales',
      description: 'Sistema de calificaciones transparente basado en experiencias reales'
    },
    {
      icon: CheckCircle,
      title: 'Garantía de Servicio',
      description: 'Si no estás satisfecho, te ayudamos a solucionarlo o te devolvemos tu dinero'
    }
  ];

  const categories = [
    { name: 'Plomería', icon: Wrench, color: 'bg-blue-100 text-blue-700' },
    { name: 'Electricidad', icon: Zap, color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Pintura', icon: Palette, color: 'bg-purple-100 text-purple-700' },
    { name: 'Jardinería', icon: Flower, color: 'bg-green-100 text-green-700' },
    { name: 'Limpieza', icon: Sparkles, color: 'bg-pink-100 text-pink-700' },
    { name: 'Carpintería', icon: Hammer, color: 'bg-orange-100 text-orange-700' },
    { name: 'Reparaciones', icon: Settings, color: 'bg-gray-100 text-gray-700' },
    { name: 'Mudanza', icon: Truck, color: 'bg-indigo-100 text-indigo-700' }
  ];

  const stats = [
    { number: '10,000+', label: 'Servicios Completados' },
    { number: '2,500+', label: 'Trabajadores Verificados' },
    { number: '4.8/5', label: 'Calificación Promedio' },
    { number: '24h', label: 'Tiempo de Respuesta' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Conectamos servicios con
                <span className="text-blue-300"> confianza</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                La plataforma líder en Perú para encontrar trabajadores verificados 
                para tus necesidades del hogar y negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Servicio
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Ofrecer Servicio
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Trabajador profesional"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Servicios Populares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra el profesional perfecto para cualquier tarea en tu hogar o negocio
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-center font-semibold text-gray-900">{category.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir ServiPerú?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos la plataforma más confiable y segura para conectar con profesionales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de peruanos que ya confían en ServiPerú para sus necesidades de servicio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Crear Cuenta Gratis
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}