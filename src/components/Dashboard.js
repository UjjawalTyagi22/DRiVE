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
  CalendarIcon,
  ChevronRightIcon
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

  // No longer showing default modules for new users - let it be empty
  // if (continueModulesList.length === 0) {
  //   continueModulesList = allModules.slice(0, 2).map(m => ({ ...m, progress: 0 }));
  // }

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
          {userProgress.length > 0 ? 'Welcome back' : 'Welcome'}, {user?.firstName || 'Friend'}!
        </h1>
        <p className="text-gray-600">
          {userProgress.length > 0
            ? 'Continue your disaster preparedness journey'
            : 'Start your journey towards disaster preparedness today'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="text-center">
                <div className="text-4xl font-black mb-1">{user?.modulesCompleted || 0}</div>
                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Modules Finished</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-4xl font-black mb-1">{user?.currentStreak || 0}</div>
                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-1">{user?.totalPoints || 0}</div>
                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Points Earned</div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-blue-50 font-bold tracking-tight">Overall Mastery</span>
                <span className="text-white font-black">{user?.overallProgress || 0}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm overflow-hidden border border-white/10 p-1">
                <div
                  className="bg-white h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ width: `${user?.overallProgress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Continue Learning / Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                {continueModulesList.length > 0 ? (
                  <>
                    <PlayCircleIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Continue Learning
                  </>
                ) : (
                  <>
                    <AcademicCapIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Recommended for You
                  </>
                )}
              </h2>
              {continueModulesList.length > 1 && (
                <Link to="/modules" className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {continueModulesList.length > 0 ? (
                continueModulesList.map((module) => (
                  <div key={module.id} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 ${module.color || 'bg-blue-600'} rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/10`}>
                        <PlayCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">PROGRESS</span>
                        <span className="text-lg font-black text-gray-900">{module.progress || 0}%</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {module.title}
                    </h3>

                    <p className="text-gray-500 text-xs font-semibold mb-4 flex items-center">
                      <BookOpenIcon className="w-4 h-4 mr-1 opacity-50" />
                      Next: <span className="text-gray-700 ml-1">{module.nextLesson || (module.progress === 100 ? 'Module Completed' : 'First Lesson')}</span>
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${module.color || 'bg-blue-600'} transition-all duration-700`}
                        style={{ width: `${module.progress || 0}%` }}
                      ></div>
                    </div>

                    <Link
                      to={`/modules/${module.id}`}
                      className="flex items-center justify-center w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all transform active:scale-95 shadow-lg shadow-gray-900/10"
                    >
                      {module.progress === 100 ? 'Review Module' : 'Continue Lesson'}
                    </Link>
                  </div>
                ))
              ) : (
                /* Show Top 2 Recommendations if new user */
                allModules.slice(0, 2).map((module) => (
                  <div key={module.id} className="border border-gray-100 bg-gray-50/30 rounded-2xl p-6 hover:border-blue-200 hover:bg-white transition-all duration-300 group">
                    <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{module.description}</p>
                    <Link
                      to={`/modules/${module.id}`}
                      className="inline-flex items-center text-sm font-black text-blue-600 hover:text-blue-700"
                    >
                      Start Module <ChevronRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Phase 1 of 4: Disaster Basics (3/12 Modules Available)
              </p>
              <Link to="/modules" className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center group">
                View Curriculum Roadmap
                <ChevronRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Recent Activity</h2>
            <div className="grid grid-cols-1 gap-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 border border-transparent hover:border-gray-100 hover:bg-gray-50/50 rounded-2xl transition-all group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${activity.type === 'completed' ? 'bg-green-100 shadow-green-100/50' :
                      activity.type === 'started' ? 'bg-blue-100 shadow-blue-100/50' :
                        activity.type === 'accessed' ? 'bg-purple-100 shadow-purple-100/50' : 'bg-yellow-100 shadow-yellow-100/50'
                      } shadow-lg`}>
                      {activity.type === 'completed' ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      ) : activity.type === 'started' || activity.type === 'accessed' ? (
                        <BookOpenIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <TrophyIcon className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm">
                        {activity.type === 'completed' ? 'Successfully Completed' :
                          activity.type === 'started' ? 'Started Module' :
                            activity.type === 'accessed' ? 'Accessed Module' : 'Earned Points in'} <span className="text-blue-600">{activity.module}</span>
                      </p>
                      <p className="text-gray-400 text-xs font-bold mt-0.5 tracking-tight uppercase">{activity.date}</p>
                    </div>

                    {activity.points > 0 && (
                      <div className="bg-blue-50 px-3 py-1.5 rounded-lg">
                        <span className="text-blue-600 font-extrabold text-sm">+{activity.points}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <ChartBarIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 opacity-50" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No activity recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 ring-1 ring-gray-900/5">
            <h3 className="text-lg font-black text-gray-900 mb-5 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500 before:rounded-full hover:bg-gray-50 p-3 rounded-r-xl transition-colors cursor-default group">
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{event.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-2 font-semibold">
                    <ClockIcon className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    {event.date} • {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 shadow-xl shadow-gray-900/20 text-white relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all duration-700"></div>
            <h3 className="text-lg font-black mb-5 relative z-10">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 relative z-10">
              <Link to="/modules" className="flex items-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group backdrop-blur-md border border-white/5">
                <AcademicCapIcon className="w-6 h-6 text-blue-400 mr-4" />
                <span className="text-sm font-bold tracking-tight">Browse Modules</span>
              </Link>
              <Link to="/progress" className="flex items-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group backdrop-blur-md border border-white/5">
                <ChartBarIcon className="w-6 h-6 text-indigo-400 mr-4" />
                <span className="text-sm font-bold tracking-tight">Detailed Progress</span>
              </Link>
              <Link to="/profile" className="flex items-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group backdrop-blur-md border border-white/5">
                <UserCircleIcon className="w-6 h-6 text-purple-400 mr-4" />
                <span className="text-sm font-bold tracking-tight">Profile Settings</span>
              </Link>
            </div>
          </div>

          {/* Support Widget / Tip */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-lg shadow-blue-500/20">
            <TrophyIcon className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h4 className="font-black text-sm mb-2 uppercase italic tracking-widest">Mastery Tip</h4>
            <p className="text-xs text-blue-50 font-medium leading-relaxed mb-4">
              Complete at least one lesson daily to maintain your learning streak and earn bonus points!
            </p>
            <Link to="/modules" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-blue-50 transition-colors">Start Day 1</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
