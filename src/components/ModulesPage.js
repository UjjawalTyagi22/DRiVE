import React, { useState, useEffect, useRef } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { FunnelIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import ModuleCard from './ModuleCard';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../api/users';
import { modules as staticModules } from '../data/modules';

const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = value === 'all'
    ? `All ${label}`
    : value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border border-transparent hover:border-blue-200 hover:bg-white rounded-2xl transition-all duration-300 min-w-[180px] group ring-offset-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-bold text-gray-700 truncate">{selectedLabel}</span>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${value === opt
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
              >
                <span>{opt === 'all' ? `All ${label}` : opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                {value === opt && <CheckIcon className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ModulesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState(staticModules);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await usersAPI.getModuleStats();
        if (stats.success) {
          const updatedModules = staticModules.map(mod => ({
            ...mod,
            enrolled: (mod.baseEnrolled || 0) + (stats.data[mod.id] || 0)
          }));
          setModules(updatedModules);
        }
      } catch (error) {
        console.error('Failed to fetch module stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
  };

  const categories = ['all', 'Natural Disasters', 'Emergency Response', 'Medical Emergency', 'Digital Safety', 'Professional Safety'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || module.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || module.category === filterCategory || !module.category; // Handle missing categories

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Modules</h1>
        <p className="text-gray-600">Explore our comprehensive disaster management and safety training modules</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <FilterDropdown
              label="Levels"
              value={filterLevel}
              options={levels}
              onChange={setFilterLevel}
              icon={FunnelIcon}
            />

            <FilterDropdown
              label="Categories"
              value={filterCategory}
              options={categories}
              onChange={setFilterCategory}
              icon={AcademicCapIcon}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          Showing {filteredModules.length} of {modules.length} available modules
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={handleModuleClick}
            showRating={true}
          />
        ))}
      </div>

      {selectedModule && (
        <Modal module={selectedModule} onClose={handleCloseModal} />
      )}

      {filteredModules.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="text-gray-400">
            <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-bold text-gray-900 mb-2">No modules found</p>
            <p className="text-sm">Try adjusting your search terms or filters to find what you're looking for.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterLevel('all'); setFilterCategory('all'); }}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
