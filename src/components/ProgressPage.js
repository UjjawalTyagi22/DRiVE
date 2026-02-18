import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  ClockIcon,
  StarIcon,
  FireIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Certificate from './Certificate';

const ProgressPage = () => {
  const { user } = useAuth();
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedCertifiedModule, setSelectedCertifiedModule] = useState(null);

  // Use user data if available, otherwise default to initial state
  const currentModuleProgress = user?.moduleProgress || [];
  const currentAchievements = user?.achievements || [];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
          <p className="text-gray-600">Track your disaster preparedness journey and achievements</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-2xl shadow-lg shadow-blue-500/20 font-bold text-sm">
          <span>Rank: {user?.rank || 'Beginner'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Completed', value: user?.modulesCompleted || 0, icon: BookOpenIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Hours', value: `${user?.totalHours || 0}h`, icon: ClockIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Streak', value: user?.currentStreak || 0, icon: FireIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Points', value: user?.totalPoints || 0, icon: StarIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Curriculum Mastery</h2>
              <span className="text-2xl font-black text-blue-600">{user?.overallProgress || 0}%</span>
            </div>

            <div className="w-full bg-gray-50 rounded-full h-4 mb-6 p-1 border border-gray-100">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000 min-w-[5%]"
                style={{ width: `${user?.overallProgress || 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
              <span>{user?.modulesCompleted || 0} Modules Completed</span>
              <span className="text-gray-300">12 Total Modules</span>
            </div>
          </div>

          {/* Detailed Module Status */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Module Breakdown</h2>

            <div className="space-y-4">
              {currentModuleProgress.length > 0 ? (
                currentModuleProgress.map((module) => (
                  <div key={module.id} className="group border border-gray-100 rounded-3xl overflow-hidden transition-all hover:shadow-md">
                    <div
                      className="p-6 cursor-pointer bg-white group-hover:bg-gray-50/50 transition-colors"
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                            {module.progress === 100 && (
                              <span className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <CheckCircleIconSolid className="w-3 h-3 mr-1" />
                                Certified
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>{module.category}</span>
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                            <span>{module.timeSpent} spent</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className={`text-xl font-black ${module.progress === 100 ? 'text-emerald-600' : 'text-gray-900'}`}>
                              {module.progress}%
                            </div>
                            {module.score > 0 && <div className="text-[10px] font-black text-gray-400 uppercase">Avg Score: {module.score}%</div>}
                          </div>
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${expandedModule === module.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {expandedModule === module.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedModule === module.id && (
                      <div className="px-8 pb-8 pt-2 bg-gray-50/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {module.lessons.map((lesson, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
                                    <CheckCircleIconSolid className="w-4 h-4 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 border-2 border-dashed border-gray-200 rounded-lg"></div>
                                )}
                                <span className={`text-sm font-bold ${lesson.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                  {lesson.name}
                                </span>
                              </div>
                              {lesson.score > 0 && <span className="text-xs font-black text-blue-600">{lesson.score}%</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold">No modules started yet.</p>
                  <Link to="/modules" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">
                    Browse Modules
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements Preview */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Badges Earned</h3>
            <div className="grid grid-cols-3 gap-3">
              {currentAchievements.length > 0 ? (
                currentAchievements.slice(0, 6).map((achievement) => (
                  <div key={achievement.id} className="group relative">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl transition-all group-hover:scale-110 group-hover:bg-blue-50">
                      {achievement.icon}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {achievement.title}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  No badges yet
                </div>
              )}
            </div>
          </div>

          {/* Action Cards */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FireIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{user?.currentStreak || 0} Day Streak!</h3>
            <p className="text-sm text-gray-500 mb-6">Keep learning to maintain your momentum.</p>
            <Link to="/modules" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <StarIcon className="w-8 h-8 mr-3 text-amber-500" />
              Verified Certificates
            </h2>
            <Link to="/modules" className="text-blue-600 text-sm font-bold hover:underline">Earn More Certificates</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentModuleProgress.filter(m => m.progress === 100).length > 0 ? (
              currentModuleProgress.filter(m => m.progress === 100).map((module) => (
                <div key={module.id} className="group cursor-pointer" onClick={() => setSelectedCertifiedModule(module)}>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all group-hover:bg-blue-50 group-hover:border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <AwardIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Verified</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700">{module.title}</h3>
                    <p className="text-xs text-gray-500 mb-4">Issued on Oct 20, 2024</p>
                    <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-widest">
                      <span>View Certificate</span>
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <StarIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">Complete any module to earn your professional certificate.</p>
                <Link to="/modules" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm">Start a Module</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCertifiedModule && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setSelectedCertifiedModule(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 z-10 p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ChevronDownIcon className="w-6 h-6" />
            </button>
            <div className="py-12">
              <Certificate
                userName={`${user?.firstName || ''} ${user?.lastName || 'Learner'}`}
                moduleTitle={selectedCertifiedModule.title}
                date="October 20, 2024"
                certificateId={`SAFE-2024-${selectedCertifiedModule.id}-VERIFIED`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AwardIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default ProgressPage;
