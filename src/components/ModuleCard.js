import React from 'react';
import { Play, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ModuleCard = ({ module, onClick }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Get progress from user data if authenticated, fallback to module prop
  const userModule = user?.moduleProgress?.find(m => m.id === module.id);
  const displayProgress = userModule ? userModule.progress : (module.progress || 0);

  const formatEnrolled = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K enrolled';
    }
    return num + ' enrolled';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAction = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      onClick(module);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
      onClick={(e) => {
        if (!isAuthenticated) {
          navigate('/login');
        } else {
          onClick(module);
        }
      }}
    >
      {/* Module Image */}
      <div className={`h-48 ${module.color} relative`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(module.level)}`}>
            {module.level}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {module.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {module.description}
        </p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{formatEnrolled(module.enrolled || module.baseEnrolled)}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">{displayProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${displayProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
              style={{ width: `${displayProgress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleAction}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          {displayProgress === 0 ? 'Start Module' :
            displayProgress === 100 ? 'Review Module' : 'Continue Learning'}
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;

