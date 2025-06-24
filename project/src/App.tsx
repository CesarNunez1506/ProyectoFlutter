import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import ClientDashboard from './components/ClientDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import SubscriptionsPage from './components/SubscriptionsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    if (user.type === 'client') {
      setCurrentPage('client-dashboard');
    } else {
      setCurrentPage('worker-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleUpdateSubscription = (planId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        subscription: planId
      });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'login':
        return <AuthPage mode="login" onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register':
        return <AuthPage mode="register" onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'client-dashboard':
        return currentUser ? <ClientDashboard currentUser={currentUser} /> : <HomePage onNavigate={setCurrentPage} />;
      case 'worker-dashboard':
        return currentUser ? <WorkerDashboard currentUser={currentUser} /> : <HomePage onNavigate={setCurrentPage} />;
      case 'subscriptions':
        return <SubscriptionsPage currentUser={currentUser} onUpdateSubscription={handleUpdateSubscription} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="pb-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;