import React from 'react';
import { Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Modal = ({ module, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStart = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/modules/${module.id}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(module.level)}`}>
                {module.level}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className={`h-48 ${module.color} rounded-xl mb-6`}></div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {module.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Duration: {module.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span>{module.enrolled}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleStart}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {module.progress === 0 ? 'Start Learning' : 'Continue'}
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;