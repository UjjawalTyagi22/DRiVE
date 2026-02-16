import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Features from './components/Features';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ModulesPage from './components/ModulesPage';
import UserProfile from './components/UserProfile';
import ProgressPage from './components/ProgressPage';
import ModuleCard from './components/ModuleCard';
import ModuleDetails from './components/ModuleDetails';
import Modal from './components/Modal';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Contact from './components/Contact';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ScrollToTop from './components/ScrollToTop';
import DashboardLayout from './components/DashboardLayout';
import { modules } from './data/modules';
import { useState } from 'react';
import './App.css';

const AppContent = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const stats = [
    { label: "Students Trained", value: "50K+", color: "text-blue-600" },
    { label: "Schools", value: "500+", color: "text-blue-600" },
    { label: "Success Rate", value: "95%", color: "text-blue-600" }
  ];

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleModuleClick = (module) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setSelectedModule(module);
    }
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout><Hero stats={stats} /><section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Learning Modules</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive disaster management education designed for different age groups and learning styles</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{modules.map((module) => (<ModuleCard key={module.id} module={module} onClick={handleModuleClick} />))}</div></div></section><Features />{selectedModule && isAuthenticated && (<Modal module={selectedModule} onClose={handleCloseModal} />)}</MainLayout>} />

        <Route path="/login" element={<MainLayout hideFooter={true}><Login /></MainLayout>} />
        <Route path="/signup" element={<MainLayout hideFooter={true}><Signup /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />

        {/* Protected Routes with DashboardLayout */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/modules" element={<ProtectedRoute><DashboardLayout><ModulesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/modules/:id" element={<ProtectedRoute><DashboardLayout><ModuleDetails /></DashboardLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><DashboardLayout><UserProfile /></DashboardLayout></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><DashboardLayout><ProgressPage /></DashboardLayout></ProtectedRoute>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
