import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AcademicCapIcon,
  ChartBarIcon,
  UserCircleIcon,
  PlayCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  TrophyIcon,
  BookOpenIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { modules as allModules } from '../data/modules';

const Dashboard = () => {
  const { user } = useAuth();

  const userProgress = user?.moduleProgress || [];
  const lastAccessedId = user?.lastAccessedModuleId;

  // 1. Derive continueModulesList with fallbacks
  let continueModulesList = [];

  // First priority: Modules in progress (0 < progress < 100)
  const inProgressModules = userProgress.filter(m => m.progress > 0 && m.progress < 100);

  if (inProgressModules.length > 0) {
    continueModulesList = [...inProgressModules];
  } else {
    // Second priority: If no modules in progress, show recently completed modules for review
    const completedModulesList = userProgress
      .filter(m => m.progress === 100)
      .slice(-2) // Get last 2 completed
      .map(m => ({ ...m, isReview: true }));

    continueModulesList = [...completedModulesList];
  }

  // Ensure last accessed module is at the top, even if it has 0 progress
  if (lastAccessedId) {
    const lastAccessedModuleData = allModules.find(m => m.id === lastAccessedId);
    if (lastAccessedModuleData) {
      const progressEntry = userProgress.find(m => m.id === lastAccessedId);
      const moduleToShow = progressEntry
        ? { ...lastAccessedModuleData, ...progressEntry }
        : { ...lastAccessedModuleData, progress: 0 };

      // Filter it out from the current list if it's there, then push to front
      continueModulesList = [
        moduleToShow,
        ...continueModulesList.filter(m => m.id !== lastAccessedId)
      ].slice(0, 2);
    }
  }

  // If still empty (new user), show first 2 modules from allModules
  if (continueModulesList.length === 0) {
    continueModulesList = allModules.slice(0, 2).map(m => ({ ...m, progress: 0 }));
  }

  // 2. Derive recentActivity with fallbacks
  let recentActivity = user?.recentActivity || [];

  // If recentActivity is empty but user has progress, derive it from moduleProgress
  if (recentActivity.length === 0 && userProgress.length > 0) {
    recentActivity = userProgress
      .map(m => ({
        id: `derived-${m.id}`,
        type: m.progress === 100 ? 'completed' : 'started',
        module: m.title || m.id,
        date: 'Recently',
        points: m.progress === 100 ? 500 : 100
      }))
      .reverse()
      .slice(0, 5);
  }

  const [upcomingEvents] = useState([
    { id: 1, title: "Live Emergency Drill Simulation", date: "Oct 2, 2024", time: "10:00 AM" },
    { id: 2, title: "Disaster Preparedness Webinar", date: "Oct 5, 2024", time: "2:00 PM" }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || 'Friend'}!
        </h1>
        <p className="text-gray-600">Continue your disaster preparedness journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{user?.modulesCompleted || 0}</div>
                <div className="text-blue-100">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{user?.currentStreak || 0}</div>
                <div className="text-blue-100">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{user?.totalPoints || 0}</div>
                <div className="text-blue-100">Total Points</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-100">Overall Progress</span>
                <span className="font-semibold">{user?.overallProgress || 0}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${user?.overallProgress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <PlayCircleIcon className="w-7 h-7 mr-2 text-blue-600" />
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {continueModulesList.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${module.color || 'from-blue-500 to-blue-600'} rounded-lg flex items-center justify-center`}>
                      <PlayCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{module.progress || 0}%</span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    Next: {module.nextLesson || (module.progress === 100 ? 'Module Completed' : 'First Lesson')}
                  </p>

                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                    {module.timeRemaining || (module.progress === 100 ? '0 min' : '15 min')} remaining
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${module.color || 'from-blue-500 to-blue-600'} transition-all duration-500`}
                      style={{ width: `${module.progress || 0}%` }}
                    ></div>
                  </div>

                  <Link
                    to={`/modules/${module.id}`}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-[1.02]"
                  >
                    {module.progress === 100 ? 'Review Module' : 'Continue Lesson'}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'completed' ? 'bg-green-100' :
                    activity.type === 'started' ? 'bg-blue-100' :
                      activity.type === 'accessed' ? 'bg-purple-100' : 'bg-yellow-100'
                    }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    ) : activity.type === 'started' || activity.type === 'accessed' ? (
                      <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <TrophyIcon className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">
                      {activity.type === 'completed' ? 'Completed' :
                        activity.type === 'started' ? 'Started' :
                          activity.type === 'accessed' ? 'Accessed' : 'Earned'} {activity.module}
                    </p>
                    <p className="text-gray-500 text-sm">{activity.date}</p>
                  </div>

                  {activity.points > 0 && (
                    <span className="text-blue-600 font-bold">+{activity.points} pts</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-blue-500 bg-blue-50/50 pl-4 py-3 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 text-sm">{event.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                    {event.date} • {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/modules" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <AcademicCapIcon className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Browse Modules</span>
              </Link>
              <Link to="/progress" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <ChartBarIcon className="w-5 h-5 text-indigo-500 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Detailed Progress</span>
              </Link>
              <Link to="/profile" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <UserCircleIcon className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Profile Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
